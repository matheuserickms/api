import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ConsultationStatusController } from "./consultation-status.controller";
import { ConsultationStatusService } from "./consultation-status.service";

@Module({
    imports : [PrismaModule],
    controllers: [ConsultationStatusController],
    providers: [ConsultationStatusService],
    exports: []
})
export class ConsultationStatusModule { }