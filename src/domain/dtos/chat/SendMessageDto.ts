import { IsNotEmpty, IsNumber } from "class-validator";

export class SendMessageDto {
	@IsNotEmpty({ message: "Message is required" })
	message!: string;

	@IsNumber({}, { message: "chatId must be a number" })
	chatId!: number;

	@IsNumber({}, { message: "senderId must be a number" })
	senderId!: number;

	@IsNumber({}, { message: "receiverId must be a number" })
	receiverId!: number;
}
