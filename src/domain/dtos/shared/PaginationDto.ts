import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class PaginationDto {
  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "Page must be a positive number" })
  page!: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "Limit must be a positive number" })
  limit!: number;
}
