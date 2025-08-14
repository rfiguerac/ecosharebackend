import { Request, Response, NextFunction } from "express";
import {
  CreateDonationDto,
  DonationRepository,
  UpdateDonationDto,
} from "../../domain";
import { CreateDonation, UpdateDonation } from "../../domain/use-case";

export class DonationController {
  constructor(private readonly donationRepository: DonationRepository) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    new CreateDonation(this.donationRepository)
      .execute(req.body as CreateDonationDto)
      .then((donation) => {
        res.status(201).json(donation.toResponse());
      })
      .catch((err) => {
        next(err);
      });
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json();
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(req.body);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    new UpdateDonation(this.donationRepository)
      .execute(req.body as UpdateDonationDto)
      .then((donation) => {
        res.json(donation.toResponse());
      })
      .catch((err) => {
        next(err);
      });
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };
}
