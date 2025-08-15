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
      const id = Number(req.params.id);
      new GetDonation(this.donationRepository).execute(id).then((donation) => {
        res.json(donation.toResponse());
      });
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new ListDonations(this.donationRepository).execute().then((donations) => {
        res.json(donations.map((donation) => donation.toResponse()));
      });
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
