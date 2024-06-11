import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ClinicalRecordController } from "./clinical-record.controller";
import { ClinicalRecordService } from "./clinical-record.service";

@Module({
    imports: [PrismaModule],
    controllers: [ClinicalRecordController],
    providers: [ClinicalRecordService],
    exports: []
})

export class ClinicalRecordModule { }