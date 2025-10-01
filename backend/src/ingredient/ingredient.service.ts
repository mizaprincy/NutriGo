import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

type DateInput = string | Date | null | undefined;

@Injectable()
export class IngredientService {
  constructor(private readonly prisma: PrismaService) {}

  async createIngredient(data: Prisma.IngredientUncheckedCreateInput) {
    try {
      return await this.prisma.ingredient.create({
        data,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findIngredient(
    id: number,
    args: Prisma.IngredientFindFirstArgs = {},
  ) {
    try {
      const { where, ...rest } = args ?? {};
      return await this.prisma.ingredient.findFirstOrThrow({
        where: {
          ...(where ?? {}),
          ingredient_id: id,
        },
        ...rest,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findAllIngredients(args: Prisma.IngredientFindManyArgs = {}) {
    try {
      return await this.prisma.ingredient.findMany({
        ...args,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async updateIngredient(
    id: number,
    data: Prisma.IngredientUncheckedUpdateInput,
  ) {
    try {
      return await this.prisma.ingredient.update({
        where: {
          ingredient_id: id,
        },
        data,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async removeIngredient(id: number) {
    try {
      return await this.prisma.ingredient.delete({
        where: {
          ingredient_id: id,
        },
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async createUnit(data: Prisma.UnitUncheckedCreateInput) {
    try {
      return await this.prisma.unit.create({
        data,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findUnit(id: number, args: Prisma.UnitFindFirstArgs = {}) {
    try {
      const { where, ...rest } = args ?? {};
      return await this.prisma.unit.findFirstOrThrow({
        where: {
          ...(where ?? {}),
          id,
        },
        ...rest,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findAllUnits(args: Prisma.UnitFindManyArgs = {}) {
    try {
      return await this.prisma.unit.findMany({
        ...args,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async updateUnit(id: number, data: Prisma.UnitUncheckedUpdateInput) {
    try {
      return await this.prisma.unit.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async removeUnit(id: number) {
    try {
      return await this.prisma.unit.delete({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async createUserIngredient(
    data: Prisma.UserIngredientUncheckedCreateInput,
  ) {
    try {
      const payload = this.normaliseUserIngredientDates(data);
      return await this.prisma.userIngredient.create({
        data: payload,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findUserIngredient(
    id: number,
    args: Prisma.UserIngredientFindFirstArgs = {},
  ) {
    try {
      const { where, ...rest } = args ?? {};
      return await this.prisma.userIngredient.findFirstOrThrow({
        where: {
          ...(where ?? {}),
          user_ingredient_id: id,
        },
        ...rest,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async findAllUserIngredients(
    args: Prisma.UserIngredientFindManyArgs = {},
  ) {
    try {
      return await this.prisma.userIngredient.findMany({
        ...args,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async updateUserIngredient(
    id: number,
    data: Prisma.UserIngredientUncheckedUpdateInput,
  ) {
    try {
      const payload = this.normaliseUserIngredientDates(data);
      return await this.prisma.userIngredient.update({
        where: {
          user_ingredient_id: id,
        },
        data: payload,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async removeUserIngredient(id: number) {
    try {
      return await this.prisma.userIngredient.delete({
        where: {
          user_ingredient_id: id,
        },
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  private normaliseUserIngredientDates<T extends { expiry_date?: unknown }>(
    data: T,
  ): T {
    if (!data?.expiry_date) return data;
    const value = data.expiry_date;

    if (value instanceof Date || typeof value === "string") {
      return {
        ...data,
        expiry_date: this.ensureDate(value),
      } as T;
    }

    if (
      typeof value === "object" &&
      value !== null &&
      "set" in (value as Record<string, unknown>)
    ) {
      const clone = { ...(value as Prisma.DateTimeFieldUpdateOperationsInput) };
      clone.set = this.ensureDate(clone.set as DateInput);
      return {
        ...data,
        expiry_date: clone,
      } as T;
    }

    return data;
  }

  private ensureDate(value: DateInput): Date {
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
        throw new NotFoundException("Ingredient resource not found");
      }
      if (error.code === "P2003") {
        throw new BadRequestException(
          "Linked resource does not exist (check related identifiers)",
        );
      }
    }

    throw error;
  }
}
