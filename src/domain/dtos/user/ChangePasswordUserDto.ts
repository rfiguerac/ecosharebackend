import { IsNotEmpty, MinLength } from "class-validator";

export class ChangePasswordUserDto {
	@IsNotEmpty({ message: "token is required" })
	token!: string;

	@IsNotEmpty({ message: "New password is required" })
	@MinLength(6, { message: "New password is too short" })
	newPassword!: string;
}
