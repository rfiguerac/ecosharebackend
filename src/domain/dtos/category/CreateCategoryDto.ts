import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: "El título no puede estar vacío" })
  @MinLength(2, { message: "El título debe tener al menos 2 caracteres" })
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  @IsNotEmpty({ message: "El icono no puede estar vacío" })
  icon!: string;
}
