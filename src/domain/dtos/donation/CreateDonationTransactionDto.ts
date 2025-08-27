import { IsString, IsIn, IsNumber } from "class-validator";

export class CreateDonationTransactionDto {
  @IsString()
  @IsIn(["received", "donated"], {
    message: "El status debe ser 'received' o 'donated'",
  })
  status: string = "received"; // Valor por defecto

  @IsNumber()
  donationId!: number;

  @IsNumber()
  receiverId!: number;
}
