import { IsString, IsNumber, IsOptional, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

export class CreateDonationDto {
  @IsString()
  title!: string;

  @Type(() => Number)
  @IsNumber()
  donorId!: number;

  @Type(() => Number)
  @IsNumber()
  categoryId!: number;

  @IsString()
  description!: string;

  @Type(() => Number)
  @IsNumber()
  latitude!: number;

  @Type(() => Number)
  @IsNumber()
  longitude!: number;

  @Type(() => Boolean)
  @IsBoolean()
  urgency!: boolean;

  @IsOptional()
  @Type(() => Date)
  expiryDate?: Date | null;
}
