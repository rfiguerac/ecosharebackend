import {
  CreateDonationTransactionDto,
  UpdateDonationTransactionDto,
} from "../../domain";
import { DonationTransactionDataSource } from "../../domain/dataSource/DonationTransactionDataSource";
import { DonationTransaction } from "../../domain/entities/DonationTransaction";
import { DonationTransactionRepository } from "../../domain/repositories/donation/DonationTransactionRepository";
import { DonationTransactionDataSourceImpl } from "../datasources/DonationTransactionDataSource.impl";

export class DonationTransactionRepositoryImpl
  implements DonationTransactionRepository
{
  constructor(
    private readonly dataSource: DonationTransactionDataSource = new DonationTransactionDataSourceImpl()
  ) {}

  create(dto: CreateDonationTransactionDto): Promise<DonationTransaction> {
    return this.dataSource.create(dto);
  }
  findById(id: number): Promise<DonationTransaction | null> {
    return this.dataSource.findById(id);
  }
  getAllTransactions(): Promise<DonationTransaction[]> {
    return this.dataSource.getAllTransactions();
  }
  update(
    id: number,
    dto: UpdateDonationTransactionDto
  ): Promise<DonationTransaction | null> {
    return this.dataSource.update(id, dto);
  }
  delete(id: number): Promise<boolean> {
    return this.dataSource.delete(id);
  }
}
