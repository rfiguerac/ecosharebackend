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
import { UploadMulti } from "../../domain/use-case/fileUpload/UploadMulti";

export class DonationController {
  constructor(private readonly donationRepository: DonationRepository) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      // Paso 1: Validar los datos antes de guardar los archivos
      const createDonationDto = plainToInstance(CreateDonationDto, req.body);
      const errors = await validate(createDonationDto);
      if (errors.length > 0) {
        const messages = errors.flatMap((error) =>
          Object.values(error.constraints || {})
        );
        return res.status(400).json({ errors: messages });
      }

      const imageUrls: string[] = [];
      const files = req.body.file;
      // Subir imágenes
      const uploadedFileNames = await UploadMulti.execute(files);
      imageUrls.push(...uploadedFileNames);

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
      ).execute({
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
      });
      res.json(donations);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateDonationDto = plainToInstance(UpdateDonationDto, req.body);
      const id = Number(req.params.id);
      const errors = await validate(updateDonationDto);
      if (errors.length > 0) {
        const messages = errors.flatMap((error) =>
          Object.values(error.constraints || {})
        );
        return res.status(400).json({ errors: messages });
      }

      const donation = await new UpdateDonation(
        this.donationRepository
      ).execute(id, updateDonationDto);
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
