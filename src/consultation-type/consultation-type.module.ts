import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ConsultationTypeController } from "./consultation-type.controller";
import { ConsultationTypeService } from "./consultation-type.service";

@Module({
    imports: [PrismaModule],
    controllers: [ConsultationTypeController],
    providers: [ConsultationTypeService],
    exports: []
})
export class ConsultationTypeModule { }