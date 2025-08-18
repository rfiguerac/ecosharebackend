import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password is too short" })
  password!: string;

  @IsNotEmpty({ message: "Name is required" })
  @MinLength(2, { message: "Name is too short" })
  name!: string;
}
