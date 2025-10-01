import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
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

export class CreateUserIngredientDto {
  @ApiProperty({ description: "Reference to the ingredient definition." })
  @IsInt()
  @IsPositive()
  ingredient_id!: number;

  @ApiProperty({ description: "Reference to the measurement unit." })
  @IsInt()
  @IsPositive()
  unit_id!: number;

  @ApiProperty({ description: "Identifier of the owning user." })
  @IsInt()
  @IsPositive()
  user_id!: number;

  @ApiProperty({ description: "Quantity available in stock." })
  @IsNumber()
  @Min(0)
  quantity!: number;

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
