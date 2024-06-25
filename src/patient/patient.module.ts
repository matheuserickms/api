import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";

@Module({
    'imports': [PrismaModule],
    'controllers': [PatientController],
    'providers': [PatientService],
    'exports': []
})
export class PatientModule { }