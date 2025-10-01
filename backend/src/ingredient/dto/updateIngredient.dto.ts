import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateIngredientDto {
  @ApiPropertyOptional({ description: "Display name of the ingredient." })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({ description: "Calories per 100g." })
  @IsOptional()
  @IsNumber()
  @Min(0)
  calories?: number;

  @ApiPropertyOptional({ description: "Protein amount per 100g." })
  @IsOptional()
  @IsNumber()
  @Min(0)
  protein?: number;

  @ApiPropertyOptional({ description: "Carbohydrate amount per 100g." })
  @IsOptional()
  @IsNumber()
  @Min(0)
  carbs?: number;

  @ApiPropertyOptional({ description: "Fat amount per 100g." })
  @IsOptional()
  @IsNumber()
  @Min(0)
  fat?: number;
}
