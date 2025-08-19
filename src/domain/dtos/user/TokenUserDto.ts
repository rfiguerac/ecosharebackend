import { IsNotEmpty } from "class-validator";

export class TokenUserDto {
	@IsNotEmpty({ message: "token is required" })
	token!: string;
}
