import { IsEmail, IsNotEmpty, MinLength, IsString } from "class-validator";
import { UserRole } from "../../../domain/entities/User";

export class RegisterUserDto {
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password is too short" })
  password!: string;

  @IsNotEmpty({ message: "Name is required" })
  @MinLength(2, { message: "Name is too short" })
  name!: string;

  @IsNotEmpty({ message: "User role is required" })
  @IsString({ message: "User role must be a string" })
  role!: UserRole;
}
