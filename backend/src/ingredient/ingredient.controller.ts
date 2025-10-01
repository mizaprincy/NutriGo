import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../guard/auth.guard";
import { PrismaService } from "../prisma/prisma.service";
import { CreateIngredientDto } from "./dto/createIngredient.dto";
import { CreateUnitDto } from "./dto/createUnit.dto";
import { CreateUserIngredientDto } from "./dto/createUserIngredient.dto";
import { UpdateIngredientDto } from "./dto/updateIngredient.dto";
import { UpdateUnitDto } from "./dto/updateUnit.dto";
import { UpdateUserIngredientDto } from "./dto/updateUserIngredient.dto";
import { IngredientService } from "./ingredient.service";

@Controller("ingredient")
@ApiTags("ingredient")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class IngredientController {
  constructor(
    private readonly ingredientService: IngredientService,
    private readonly helper: PrismaService,
  ) {}

  @Get("catalog/:id")
  @ApiQuery({ name: "args", required: false })
  findOneIngredient(
    @Param("id") id: number,
    @Query() { args }: { args?: string },
  ) {
    return this.ingredientService.findIngredient(
      +id,
      this.helper.parsingArgs(args),
    );
  }

  @Get("catalog")
  @ApiQuery({ name: "args", required: false })
  findAllIngredients(@Query() { args }: { args?: string }) {
    return this.ingredientService.findAllIngredients(
      this.helper.parsingArgs(args),
    );
  }

  @Post("catalog")
  createIngredient(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.createIngredient(createIngredientDto);
  }

  @Patch("catalog/:id")
  updateIngredient(
    @Param("id") id: number,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientService.updateIngredient(+id, updateIngredientDto);
  }

  @Delete("catalog/:id")
  removeIngredient(@Param("id") id: number) {
    return this.ingredientService.removeIngredient(+id);
  }

  @Get("units/:id")
  @ApiQuery({ name: "args", required: false })
  findOneUnit(@Param("id") id: number, @Query() { args }: { args?: string }) {
    return this.ingredientService.findUnit(+id, this.helper.parsingArgs(args));
  }

  @Get("units")
  @ApiQuery({ name: "args", required: false })
  findAllUnits(@Query() { args }: { args?: string }) {
    return this.ingredientService.findAllUnits(this.helper.parsingArgs(args));
  }

  @Post("units")
  createUnit(@Body() createUnitDto: CreateUnitDto) {
    return this.ingredientService.createUnit(createUnitDto);
  }

  @Patch("units/:id")
  updateUnit(@Param("id") id: number, @Body() updateUnitDto: UpdateUnitDto) {
    return this.ingredientService.updateUnit(+id, updateUnitDto);
  }

  @Delete("units/:id")
  removeUnit(@Param("id") id: number) {
    return this.ingredientService.removeUnit(+id);
  }

  @Get("inventory/:id")
  @ApiQuery({ name: "args", required: false })
  findOneUserIngredient(
    @Param("id") id: number,
    @Query() { args }: { args?: string },
  ) {
    return this.ingredientService.findUserIngredient(
      +id,
      this.helper.parsingArgs(args),
    );
  }

  @Get("inventory")
  @ApiQuery({ name: "args", required: false })
  findAllUserIngredients(@Query() { args }: { args?: string }) {
    return this.ingredientService.findAllUserIngredients(
      this.helper.parsingArgs(args),
    );
  }

  @Post("inventory")
  createUserIngredient(
    @Body() createUserIngredientDto: CreateUserIngredientDto,
  ) {
    return this.ingredientService.createUserIngredient(createUserIngredientDto);
  }

  @Patch("inventory/:id")
  updateUserIngredient(
    @Param("id") id: number,
    @Body() updateUserIngredientDto: UpdateUserIngredientDto,
  ) {
    return this.ingredientService.updateUserIngredient(
      +id,
      updateUserIngredientDto,
    );
  }

  @Delete("inventory/:id")
  removeUserIngredient(@Param("id") id: number) {
    return this.ingredientService.removeUserIngredient(+id);
  }
}
