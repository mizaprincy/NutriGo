import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserUncheckedCreateInput) {
    try {
      const { password, ...rest } = await this.prisma.user.create({
        data,
      });
      return rest;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Find a user by username
  async findOne(id: number, args: Prisma.UserFindFirstArgs) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: {
          user_id: id,
        },
        omit: {
          password: true,
        },
        ...args,
      });
      return user;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  // get all
  async findAll(args: Prisma.UserFindManyArgs) {
    try {
      const users = await this.prisma.user.findMany({
        omit: {
          password: true,
        },
        ...args,
      });
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Update User
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          user_id: id,
        },
        omit: {
          password: true,
        },
        data: updateUserDto,
      });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Delete User
  async remove(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          user_id: id,
        },
        omit: {
          password: true,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
