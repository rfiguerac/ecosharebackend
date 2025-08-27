import {
  CreateDonationTransactionDto,
  UpdateDonationTransactionDto,
} from "../dtos";
import { DonationTransaction } from "../entities/DonationTransaction";

export abstract class DonationTransactionDataSource {
  abstract create(
    dto: CreateDonationTransactionDto
  ): Promise<DonationTransaction>;
  abstract findById(id: number): Promise<DonationTransaction | null>;
  abstract getAllTransactions(): Promise<DonationTransaction[]>;
  abstract update(
    id: number,
    dto: UpdateDonationTransactionDto
  ): Promise<DonationTransaction | null>;
  abstract delete(id: number): Promise<boolean>;
}
