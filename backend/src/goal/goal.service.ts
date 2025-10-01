import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

type DateLike = string | Date | null | undefined;

type GoalHistoryUpdate =
  | Prisma.GoalHistoryUncheckedUpdateInput
  | Prisma.GoalHistoryUpdateInput;

type GoalHistoryCreate =
  | Prisma.GoalHistoryUncheckedCreateInput
  | Prisma.GoalHistoryCreateInput;

@Injectable()
export class GoalService {
  constructor(private readonly prisma: PrismaService) {}

  async createGoalHistory(data: GoalHistoryCreate) {
    try {
      const payload = this.normaliseDateFields(data);
      return await this.prisma.goalHistory.create({
        data: payload,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findGoalHistory(
    id: number,
    args: Prisma.GoalHistoryFindFirstArgs = {},
  ) {
    try {
      const { where, ...rest } = args ?? {};
      return await this.prisma.goalHistory.findFirstOrThrow({
        where: {
          ...(where ?? {}),
          goal_history_id: id,
        },
        ...rest,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findAllGoalHistories(args: Prisma.GoalHistoryFindManyArgs = {}) {
    try {
      return await this.prisma.goalHistory.findMany({
        ...args,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async updateGoalHistory(id: number, data: GoalHistoryUpdate) {
    try {
      const payload = this.normaliseDateFields(data);
      return await this.prisma.goalHistory.update({
        where: {
          goal_history_id: id,
        },
        data: payload,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async removeGoalHistory(id: number) {
    try {
      return await this.prisma.goalHistory.delete({
        where: {
          goal_history_id: id,
        },
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  private normaliseDateFields<T extends GoalHistoryCreate | GoalHistoryUpdate>(
    data: T,
  ): T {
    const next: Record<string, unknown> = { ...data };

    if ("start_date" in next) {
      next.start_date = this.normaliseDateValue(next.start_date as DateLike);
    }

    if ("end_date" in next) {
      const endValue = next.end_date as DateLike;
      next.end_date = endValue == null ? endValue : this.normaliseDateValue(endValue);
    }

    return next as T;
  }

  private normaliseDateValue(value: DateLike | Prisma.DateTimeFieldUpdateOperationsInput) {
    if (value == null) return value;

    if (value instanceof Date || typeof value === "string") {
      return this.ensureDate(value);
    }

    if (
      typeof value === "object" &&
      "set" in value &&
      (value as Prisma.DateTimeFieldUpdateOperationsInput).set !== undefined
    ) {
      const clone = { ...value } as Prisma.DateTimeFieldUpdateOperationsInput;
      clone.set = this.ensureDate(clone.set as DateLike);
      return clone;
    }

    return value;
  }

  private ensureDate(value: DateLike): Date {
    if (value instanceof Date) {
      if (!Number.isNaN(value.getTime())) return value;
      throw new BadRequestException("Invalid date value");
    }

    if (typeof value === "string") {
      const parsed = new Date(value);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
      throw new BadRequestException("Invalid date string value");
    }

    throw new BadRequestException("A date value is required");
  }

  private handleError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new NotFoundException("Goal history not found");
      }
      if (error.code === "P2003") {
        throw new BadRequestException(
          "Linked resource does not exist (check user or references)",
        );
      }
    }

    throw error;
  }
}
