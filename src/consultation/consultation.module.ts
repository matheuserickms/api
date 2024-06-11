import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ConsultationController } from "./consultation.controller";
import { ConsultationService } from "./consultation.service";

@Module({
    imports: [PrismaModule],
    controllers: [ConsultationController],
    providers: [ConsultationService],
    exports: []
})
export class ConsultationModule {
}