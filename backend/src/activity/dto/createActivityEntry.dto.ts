import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class CreateActivityEntryDto {
  @ApiProperty({ description: "Label of the recorded activity." })
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiProperty({ description: "Duration in minutes." })
  @IsNumber()
  @IsPositive()
  duration!: number;

  @ApiProperty({ description: "Reported effort level for the activity." })
  @IsString()
  @IsNotEmpty()
  intensity!: string;

  @ApiProperty({ description: "Calories burned during the activity." })
  @IsNumber()
  @IsPositive()
  calories_burned!: number;

  @ApiProperty({ description: "Date when the activity occurred." })
  @IsDateString()
  date!: string;

  @ApiProperty({ description: "Related user identifier." })
  @IsInt()
  @IsPositive()
  user_id!: number;

  @ApiPropertyOptional({ description: "Flag to highlight unexpected workouts." })
  @IsOptional()
  @IsBoolean()
  is_unexpected?: boolean;
}
