import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ActivityModule } from "./activity/activity.module";
import { AuthModule } from "./auth/auth.module";
import { GoalModule } from "./goal/goal.module";
import { IngredientModule } from "./ingredient/ingredient.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    ActivityModule,
    GoalModule,
    IngredientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
