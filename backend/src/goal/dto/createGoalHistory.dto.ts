import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { GoalType } from "@prisma/client";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from "class-validator";

export class CreateGoalHistoryDto {
  @ApiProperty({ enum: GoalType, description: "Type of goal the user is pursuing." })
  @IsEnum(GoalType)
  goal_type!: GoalType;

  @ApiProperty({ description: "Date when the goal period starts." })
  @IsDateString()
  start_date!: string;

  @ApiPropertyOptional({ description: "Date when the goal period ends." })
  @IsOptional()
  @IsDateString()
  end_date?: string;

  @ApiPropertyOptional({ description: "Target weight variation in kilograms (negative for loss)." })
  @IsOptional()
  @IsNumber()
  target_weight_change?: number;

  @ApiProperty({ description: "Owner of the goal history." })
  @IsInt()
  @IsPositive()
  user_id!: number;
}
