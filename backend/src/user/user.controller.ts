// src/users/users.controller.ts
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
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtAuthGuard } from "../guard/auth.guard";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserService } from "./user.service";

@Controller("user")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private helper: PrismaService,
  ) {}

  //Find one user
  @Get(":id")
  @ApiQuery({ name: "args", required: false })
  findOneProfile(
    @Param("id") id: number,
    @Query() { args }: { args?: string },
  ) {
    return this.userService.findOne(+id, this.helper.parsingArgs(args));
  }

  //Find all users
  @Get()
  @ApiQuery({ name: "args", required: false })
  getAll(@Query() { args }: { args: string }) {
    return this.userService.findAll(this.helper.parsingArgs(args));
  }

  //Add one user
  @Post()
  addProfile(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //Update one user
  @Patch(":id")
  updateProfile(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  //Remove one user
  @Delete(":id")
  deleteProfile(@Param("id") id: number) {
    return this.userService.remove(+id);
  }
}
