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
import { CreateActivityEntryDto } from "./dto/createActivityEntry.dto";
import { CreateWeightEntryDto } from "./dto/createWeightEntry.dto";
import { UpdateActivityEntryDto } from "./dto/updateActivityEntry.dto";
import { UpdateWeightEntryDto } from "./dto/updateWeightEntry.dto";
import { ActivityService } from "./activity.service";

@Controller("activity")
@ApiTags("activity")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly helper: PrismaService,
  ) {}

  @Get("entries/:id")
  @ApiQuery({ name: "args", required: false })
  findOneActivity(
    @Param("id") id: number,
    @Query() { args }: { args?: string },
  ) {
    return this.activityService.findActivity(+id, this.helper.parsingArgs(args));
  }

  @Get("entries")
  @ApiQuery({ name: "args", required: false })
  findAllActivities(@Query() { args }: { args?: string }) {
    return this.activityService.findAllActivities(this.helper.parsingArgs(args));
  }

  @Post("entries")
  createActivity(@Body() createActivityEntryDto: CreateActivityEntryDto) {
    return this.activityService.createActivity(createActivityEntryDto);
  }

  @Patch("entries/:id")
  updateActivity(
    @Param("id") id: number,
    @Body() updateActivityEntryDto: UpdateActivityEntryDto,
  ) {
    return this.activityService.updateActivity(+id, updateActivityEntryDto);
  }

  @Delete("entries/:id")
  removeActivity(@Param("id") id: number) {
    return this.activityService.removeActivity(+id);
  }

  @Get("weights/:id")
  @ApiQuery({ name: "args", required: false })
  findOneWeight(
    @Param("id") id: number,
    @Query() { args }: { args?: string },
  ) {
    return this.activityService.findWeight(+id, this.helper.parsingArgs(args));
  }

  @Get("weights")
  @ApiQuery({ name: "args", required: false })
  findAllWeights(@Query() { args }: { args?: string }) {
    return this.activityService.findAllWeights(this.helper.parsingArgs(args));
  }

  @Post("weights")
  createWeight(@Body() createWeightEntryDto: CreateWeightEntryDto) {
    return this.activityService.createWeight(createWeightEntryDto);
  }

  @Patch("weights/:id")
  updateWeight(
    @Param("id") id: number,
    @Body() updateWeightEntryDto: UpdateWeightEntryDto,
  ) {
    return this.activityService.updateWeight(+id, updateWeightEntryDto);
  }

  @Delete("weights/:id")
  removeWeight(@Param("id") id: number) {
    return this.activityService.removeWeight(+id);
  }
}
