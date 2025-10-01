import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";

export class UpdateWeightEntryDto {
  @ApiPropertyOptional({ description: "Measured weight in kilograms." })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight?: number;

  @ApiPropertyOptional({ description: "Date when the weight was recorded." })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ description: "Related user identifier." })
  @IsOptional()
  @IsInt()
  @IsPositive()
  user_id?: number;
}
