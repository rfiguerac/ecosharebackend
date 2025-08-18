import { IsEmail, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @IsString()
  @MinLength(2, { message: "Name is too short" })
  name!: string;
}
