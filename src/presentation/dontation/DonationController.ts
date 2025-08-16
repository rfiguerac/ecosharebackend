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

export class DonationController {
  constructor(private readonly donationRepository: DonationRepository) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "Image files are required." });
      }

      // Obtener las URLs de los archivos subidos
      const imageUrls = files.map(
        (file) => `/uploads/donations/${file.filename}`
      );

      // Se crea el DTO a partir de los datos en req.body
      const createDonationDto = new CreateDonationDto();
      createDonationDto.title = req.body.title;
      createDonationDto.description = req.body.description;
      createDonationDto.donorId = Number(req.body.donorId);
      createDonationDto.categoryId = Number(req.body.categoryId);
      createDonationDto.latitude = Number(req.body.latitude);
      createDonationDto.longitude = Number(req.body.longitude);
      createDonationDto.expiryDate = req.body.expiryDate;
      createDonationDto.urgency = req.body.urgency === "true";

      // Se llama al caso de uso para crear la donación
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
      // Se crea el DTO a partir de los datos en req.body
      const updateDonationDto = new UpdateDonationDto();
      updateDonationDto.id = Number(req.params.id);
      updateDonationDto.title = req.body.title;
      updateDonationDto.description = req.body.description;
      updateDonationDto.categoryId = Number(req.body.categoryId);
      updateDonationDto.latitude = Number(req.body.latitude);
      updateDonationDto.longitude = Number(req.body.longitude);
      updateDonationDto.expiryDate = req.body.expiryDate;
      updateDonationDto.urgency = req.body.urgency === "true";

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
      res.status(204).send(); // 204 No Content for successful deletion
    } catch (err) {
      next(err);
    }
  };
}
