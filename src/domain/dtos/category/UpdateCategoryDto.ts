import { IsNumber, IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsNumber()
  id!: number;

  @IsString()
  title!: string;

  @IsString()
  description!: string;
}
