import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNumber, IsPositive } from "class-validator";

export class CreateWeightEntryDto {
  @ApiProperty({ description: "Measured weight in kilograms." })
  @IsNumber()
  @IsPositive()
  weight!: number;

  @ApiProperty({ description: "Date when the weight was recorded." })
  @IsDateString()
  date!: string;

  @ApiProperty({ description: "Related user identifier." })
  @IsInt()
  @IsPositive()
  user_id!: number;
}
