import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

type DateLike = string | Date | null | undefined;

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async createActivity(data: Prisma.ActivityEntryUncheckedCreateInput) {
    try {
      const payload = {
        ...data,
        date: this.ensureDate(data.date),
      } satisfies Prisma.ActivityEntryUncheckedCreateInput;
      return await this.prisma.activityEntry.create({
        data: payload,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findActivity(
    id: number,
    args: Prisma.ActivityEntryFindFirstArgs = {},
  ) {
    try {
      const { where, ...rest } = args ?? {};
      return await this.prisma.activityEntry.findFirstOrThrow({
        where: {
          ...(where ?? {}),
          activity_entry_id: id,
        },
        ...rest,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findAllActivities(args: Prisma.ActivityEntryFindManyArgs = {}) {
    try {
      return await this.prisma.activityEntry.findMany({
        ...args,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async updateActivity(
    id: number,
    data: Prisma.ActivityEntryUncheckedUpdateInput,
  ) {
    try {
      const payload = this.normaliseUpdateDate(data);
      return await this.prisma.activityEntry.update({
        where: {
          activity_entry_id: id,
        },
        data: payload,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async removeActivity(id: number) {
    try {
      return await this.prisma.activityEntry.delete({
        where: {
          activity_entry_id: id,
        },
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async createWeight(data: Prisma.WeightEntryUncheckedCreateInput) {
    try {
      const payload = {
        ...data,
        date: this.ensureDate(data.date),
      } satisfies Prisma.WeightEntryUncheckedCreateInput;
      return await this.prisma.weightEntry.create({
        data: payload,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findWeight(
    id: number,
    args: Prisma.WeightEntryFindFirstArgs = {},
  ) {
    try {
      const { where, ...rest } = args ?? {};
      return await this.prisma.weightEntry.findFirstOrThrow({
        where: {
          ...(where ?? {}),
          weight_entry_id: id,
        },
        ...rest,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findAllWeights(args: Prisma.WeightEntryFindManyArgs = {}) {
    try {
      return await this.prisma.weightEntry.findMany({
        ...args,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async updateWeight(
    id: number,
    data: Prisma.WeightEntryUncheckedUpdateInput,
  ) {
    try {
      const payload = this.normaliseUpdateDate(data);
      return await this.prisma.weightEntry.update({
        where: {
          weight_entry_id: id,
        },
        data: payload,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async removeWeight(id: number) {
    try {
      return await this.prisma.weightEntry.delete({
        where: {
          weight_entry_id: id,
        },
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
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

  private normaliseUpdateDate<T extends { date?: unknown }>(data: T): T {
    if (!data?.date) return data;
    const { date } = data;

    if (date instanceof Date || typeof date === "string") {
      return { ...data, date: this.ensureDate(date) };
    }

    if (
      typeof date === "object" &&
      date !== null &&
      "set" in (date as Record<string, unknown>)
    ) {
      const current = (date as Prisma.DateTimeFieldUpdateOperationsInput).set;
      if (current instanceof Date || typeof current === "string") {
        return {
          ...data,
          date: {
            ...(date as Prisma.DateTimeFieldUpdateOperationsInput),
            set: this.ensureDate(current),
          },
        };
      }
    }

    return data;
  }

  private handleError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new NotFoundException("Activity resource not found");
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
