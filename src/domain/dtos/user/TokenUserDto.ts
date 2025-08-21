import { IsNotEmpty, IsString } from "class-validator";

export class TokenUserDto {
	@IsNotEmpty({ message: "token is required" })
	@IsString({ message: "token must be a string" })
	token!: string;
}
