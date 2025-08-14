import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsUrl,
  ValidateNested,
  IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateDonationDto {
  @IsString()
  title!: string;

  @IsNumber()
  donorId!: number;

  @IsNumber()
  categoryId!: number;

  @IsString()
  description!: string;

  @IsUrl()
  imageUrl!: string;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsBoolean()
  urgency!: boolean;

  @IsOptional()
  @Type(() => Date)
  expiryDate?: Date | null;
}
