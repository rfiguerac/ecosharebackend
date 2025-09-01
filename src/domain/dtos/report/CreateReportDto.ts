import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReportDto {
	@IsNotEmpty()
	@IsString()
    description!: string;

    @IsNotEmpty()
    @IsNumber()
    donationId!: number;

    @IsNotEmpty()
    @IsNumber()
    reporterId!: number;

    @IsBoolean()
    @Type(() => Boolean)
    isReviewed!: boolean;

    @IsOptional()
    @Type(() => Date)
    createdAt?: Date;

    @IsOptional()
    @Type(() => Date)
    updatedAt?: Date;
}
