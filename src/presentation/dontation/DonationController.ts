import { Request, Response, NextFunction } from "express";
import {
  CreateDonationDto,
  DonationRepository,
  UpdateDonationDto,
} from "../../domain";
import {
  CreateDonation,
  ListDonations,
  UpdateDonation,
  GetDonation,
} from "../../domain";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

export class DonationController {
  constructor(private readonly donationRepository: DonationRepository) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "Image files are required." });
      }

      // Paso 1: Validar los datos antes de guardar los archivos
      const createDonationDto = plainToInstance(CreateDonationDto, req.body);
      const errors = await validate(createDonationDto);
      if (errors.length > 0) {
        const messages = errors.flatMap((error) =>
          Object.values(error.constraints || {})
        );
        return res.status(400).json({ errors: messages });
      }

      // Paso 2: Si la validación pasa, guardar los archivos en el disco
      const uploadDir = join(process.cwd(), "public/uploads/donations");
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }

      const imageUrls: string[] = [];
      files.forEach((file) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = join(uploadDir, fileName);
        writeFileSync(filePath, file.buffer);
        imageUrls.push(`/uploads/donations/${fileName}`);
      });

      // Paso 3: Llamar al caso de uso para crear la donación en la BD
      const donation = await new CreateDonation(
        this.donationRepository
      ).execute(createDonationDto, imageUrls);

      res.status(201).json(donation.toResponse());
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const donation = await new GetDonation(this.donationRepository).execute(
        id
      );
      if (!donation) {
        return res.status(404).json({ error: "Donation not found." });
      }
      res.json(donation.toResponse());
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const donations = await new ListDonations(
        this.donationRepository
      ).execute();
      res.json(donations.map((donation) => donation.toResponse()));
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateDonationDto = plainToInstance(UpdateDonationDto, req.body);
      updateDonationDto.id = Number(req.params.id);
      const errors = await validate(updateDonationDto);
      if (errors.length > 0) {
        const messages = errors.flatMap((error) =>
          Object.values(error.constraints || {})
        );
        return res.status(400).json({ errors: messages });
      }

      const donation = await new UpdateDonation(
        this.donationRepository
      ).execute(updateDonationDto);
      res.json(donation.toResponse());
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.donationRepository.deleteById(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
