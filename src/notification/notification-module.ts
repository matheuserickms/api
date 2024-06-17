import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { NotificationController } from "./notification-controller.dto";
import { NotificationService } from "./notification.service";

@Module({
    imports: [PrismaModule],
    controllers: [NotificationController],
    providers: [NotificationService],
    exports: []
})
export class NotificationModule { }