import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUnitDto {
  @ApiPropertyOptional({ description: "Name of the measurement unit." })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}
