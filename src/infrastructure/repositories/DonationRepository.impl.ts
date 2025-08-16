import {
  CreateDonationDto,
  Donation,
  DonationDataSource,
  DonationRepository,
  UpdateDonationDto,
} from "../../domain";

export class DonationRepositoryImpl implements DonationRepository {
  constructor(private readonly datasource: DonationDataSource) {}

  create = async (
    dto: CreateDonationDto,
    imageUrls: string[]
  ): Promise<Donation> => {
    return this.datasource.create(dto, imageUrls);
  };

  getById = async (id: number): Promise<Donation> => {
    return this.datasource.findById(id);
  };

  getAll = async (): Promise<Donation[]> => {
    return this.datasource.findAll();
  };

  updateById = async (dto: UpdateDonationDto): Promise<Donation> => {
    return this.datasource.update(dto);
  };

  deleteById = async (id: number): Promise<Donation> => {
    return this.datasource.deleteById(id);
  };
}
