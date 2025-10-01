import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  last_name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  gender: string;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  date_of_birth: Date;
}
