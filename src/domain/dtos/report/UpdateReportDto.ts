import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateReportDto {
    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsBoolean()
    @Type(() => Boolean)
    isReviewed!: boolean;

    @Type(() => Date)
    updatedAt!: Date;
}
