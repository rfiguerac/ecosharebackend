import { IsIn, IsString } from "class-validator";

export class UpdateDonationTransactionDto {
  @IsString()
  @IsIn(["received", "donated"], {
    message: "El status debe ser 'received' o 'donated'",
  })
  status!: string;
}
