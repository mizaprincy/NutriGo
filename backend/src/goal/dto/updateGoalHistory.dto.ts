import { ApiPropertyOptional } from "@nestjs/swagger";
import { GoalType } from "@prisma/client";
import { IsDateString, IsEnum, IsNumber, IsOptional } from "class-validator";

export class UpdateGoalHistoryDto {
  @ApiPropertyOptional({ enum: GoalType, description: "Type of goal the user is pursuing." })
  @IsOptional()
  @IsEnum(GoalType)
  goal_type?: GoalType;

  @ApiPropertyOptional({ description: "Date when the goal period starts." })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiPropertyOptional({ description: "Date when the goal period ends." })
  @IsOptional()
  @IsDateString()
  end_date?: string;

  @ApiPropertyOptional({ description: "Target weight variation in kilograms (negative for loss)." })
  @IsOptional()
  @IsNumber()
  target_weight_change?: number;
}
