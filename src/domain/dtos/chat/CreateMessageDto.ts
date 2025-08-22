import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateMessageDto {
	@IsNotEmpty({ message: "Message is required" })
	content!: string;

	@IsNumber({}, { message: "Chat ID must be a number" })
	userId!: number;
}
