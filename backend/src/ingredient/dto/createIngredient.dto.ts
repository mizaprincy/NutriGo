import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateIngredientDto {
  @ApiProperty({ description: "Display name of the ingredient." })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: "Calories per 100g." })
  @IsNumber()
  @Min(0)
  calories!: number;

  @ApiProperty({ description: "Protein amount per 100g." })
  @IsNumber()
  @Min(0)
  protein!: number;

  @ApiProperty({ description: "Carbohydrate amount per 100g." })
  @IsNumber()
  @Min(0)
  carbs!: number;

  @ApiProperty({ description: "Fat amount per 100g." })
  @IsNumber()
  @Min(0)
  fat!: number;
}
