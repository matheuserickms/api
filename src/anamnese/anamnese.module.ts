import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AnamneseController } from "./anamnese.controller";
import { AnamneseService } from "./anamnese.service";

@Module({
    imports: [PrismaModule],
    controllers: [AnamneseController],
    providers: [AnamneseService],
    exports: []
})

export class AnamneseModule {
}