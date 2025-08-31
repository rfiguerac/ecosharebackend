import { IsNotEmpty, IsNumber } from "class-validator";
import { IsString } from "class-validator";

export class CreateChatDto {
  @IsNotEmpty()
  @IsNumber()
  userId!: number;

  @IsNotEmpty()
  @IsNumber()
  donorId!: number;
}
