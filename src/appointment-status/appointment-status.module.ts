import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AppointmentStatusController } from "./appointment-status.controller";
import { AppointmentStatusService } from "./appointment-status.service";

@Module({
    imports: [PrismaModule],
    controllers: [AppointmentStatusController],
    providers: [AppointmentStatusService],
    exports: []
})

export class AppointmentStatusModule { }
