import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from "class-validator";

export class UpdateUserIngredientDto {
  @ApiPropertyOptional({ description: "Reference to the ingredient definition." })
  @IsOptional()
  @IsInt()
  @IsPositive()
  ingredient_id?: number;

  @ApiPropertyOptional({ description: "Reference to the measurement unit." })
  @IsOptional()
  @IsInt()
  @IsPositive()
  unit_id?: number;

  @ApiPropertyOptional({ description: "Identifier of the owning user." })
  @IsOptional()
  @IsInt()
  @IsPositive()
  user_id?: number;

  @ApiPropertyOptional({ description: "Quantity available in stock." })
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @ApiPropertyOptional({ description: "Expiration date (ISO 8601)." })
  @IsOptional()
  @IsDateString()
  expiry_date?: string;

  @ApiPropertyOptional({ description: "Unit label provided by the user when needed." })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  unit?: string;
}
