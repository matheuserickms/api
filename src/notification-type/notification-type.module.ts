import { Module } from "@nestjs/common";
import { NotificationTypeController } from "./notification-type.controller.";
import { NotificationTypeService } from "./notification-type.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    'imports': [PrismaModule],
    'controllers': [NotificationTypeController],
    'providers': [NotificationTypeService],
    'exports': []
})
export class NotificationTypeModule { }