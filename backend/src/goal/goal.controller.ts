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
import { CreateGoalHistoryDto } from "./dto/createGoalHistory.dto";
import { UpdateGoalHistoryDto } from "./dto/updateGoalHistory.dto";
import { GoalService } from "./goal.service";

@Controller("goal")
@ApiTags("goal")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GoalController {
  constructor(
    private readonly goalService: GoalService,
    private readonly helper: PrismaService,
  ) {}

  @Get("history/:id")
  @ApiQuery({ name: "args", required: false })
  findOneGoalHistory(
    @Param("id") id: number,
    @Query() { args }: { args?: string },
  ) {
    return this.goalService.findGoalHistory(+id, this.helper.parsingArgs(args));
  }

  @Get("history")
  @ApiQuery({ name: "args", required: false })
  findAllGoalHistories(@Query() { args }: { args?: string }) {
    return this.goalService.findAllGoalHistories(this.helper.parsingArgs(args));
  }

  @Post("history")
  createGoalHistory(@Body() createGoalHistoryDto: CreateGoalHistoryDto) {
    return this.goalService.createGoalHistory(createGoalHistoryDto);
  }

  @Patch("history/:id")
  updateGoalHistory(
    @Param("id") id: number,
    @Body() updateGoalHistoryDto: UpdateGoalHistoryDto,
  ) {
    return this.goalService.updateGoalHistory(+id, updateGoalHistoryDto);
  }

  @Delete("history/:id")
  removeGoalHistory(@Param("id") id: number) {
    return this.goalService.removeGoalHistory(+id);
  }
}
