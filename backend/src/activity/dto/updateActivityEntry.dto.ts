import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class UpdateActivityEntryDto {
  @ApiPropertyOptional({ description: "Label of the recorded activity." })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ description: "Duration in minutes." })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  duration?: number;

  @ApiPropertyOptional({ description: "Reported effort level for the activity." })
  @IsOptional()
  @IsString()
  intensity?: string;

  @ApiPropertyOptional({ description: "Calories burned during the activity." })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  calories_burned?: number;

  @ApiPropertyOptional({ description: "Date when the activity occurred." })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ description: "Related user identifier." })
  @IsOptional()
  @IsInt()
  @IsPositive()
  user_id?: number;

  @ApiPropertyOptional({ description: "Flag to highlight unexpected workouts." })
  @IsOptional()
  @IsBoolean()
  is_unexpected?: boolean;
}
