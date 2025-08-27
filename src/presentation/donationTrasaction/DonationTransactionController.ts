import { NextFunction, Request, Response } from "express";
import { DonationTransactionRepository } from "../../domain/repositories/donation/DonationTransactionRepository";
import {
  CreateDonationTransaction,
  DeleteDonationTransaction,
  GetAllDonationTransactions,
  GetDonationTransaction,
  UpdateDonationTransaction,
} from "../../domain";

export class DonationTransactionController {
  constructor(private readonly repo: DonationTransactionRepository) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const donationTransaction = await new CreateDonationTransaction(
        this.repo
      ).execute(data);

      res.status(201).json(donationTransaction.toResponse());
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const donationTransaction = await new GetDonationTransaction(
        this.repo
      ).execute(id);
      if (!donationTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      return res.status(200).json(donationTransaction.toResponse());
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const donationTransactions = await new GetAllDonationTransactions(
        this.repo
      ).execute();
      return res
        .status(200)
        .json(donationTransactions.map((tx) => tx.toResponse()));
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const donationTransaction = await new UpdateDonationTransaction(
        this.repo
      ).execute(id, data);
      if (!donationTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      return res.status(200).json(donationTransaction.toResponse());
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const deleted = await new DeleteDonationTransaction(this.repo).execute(
        id
      );
      if (!deleted) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      return res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };
}
