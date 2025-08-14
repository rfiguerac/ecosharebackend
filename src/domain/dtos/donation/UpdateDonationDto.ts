import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";

export class UpdateDonationDto {
  @IsNumber()
  id!: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsBoolean()
  urgency?: boolean;

  @IsOptional()
  @Type(() => Date)
  expiryDate?: Date | null;
}
