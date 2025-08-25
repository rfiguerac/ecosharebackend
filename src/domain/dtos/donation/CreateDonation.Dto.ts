import { IsString, IsNumber, IsOptional, IsBoolean } from "class-validator";
import { Transform, Type } from "class-transformer";

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

  @IsNumber()
  @Type(() => Number)
  longitude!: number;

  @IsBoolean()
  @Type(() => Boolean)
  urgent!: boolean;

  @IsOptional()
  @Type(() => Date)
  expiryDate?: Date | null;
}
