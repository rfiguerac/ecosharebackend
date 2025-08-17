import { IsNumber, IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  icon!: string;
}
