import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUnitDto {
  @ApiProperty({ description: "Name of the measurement unit." })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
