import { IsNumber, IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsNumber()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  description!: string;
}
