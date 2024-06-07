import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePatchAnamnese } from "./dto/update-patch-anamnese.dto";
import { UpdatePutAnamneseDTO } from "./dto/update-put-anamnese.dto";
import { CreateAnamneseDTO } from "./dto/create-anamnese.dto";
import { parse } from "path";

@Injectable()
export class AnamneseService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateAnamneseDTO) {
        const anamnese: any = data;
        
        anamnese.patient_id = parseInt(anamnese.patient_id);
        //validar se existe paciente criado
        return this.prisma.anamnese.create({
            data: anamnese
        });
    }

    async list() {
        return this.prisma.anamnese.findMany()
    }

    async show(id: number) {
        return this.prisma.anamnese.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: number, data: UpdatePutAnamneseDTO) {
        return this.prisma.anamnese.updateMany({
            data: data,
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, data: UpdatePatchAnamnese) {

        await this.exists(id);

        return this.prisma.anamnese.updateMany({
            data: data,
            where: {
                id
            }
        })
    }

    async delete(id: number) {

        await this.exists(id);

        return this.prisma.anamnese.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        const user = await this.prisma.anamnese.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            throw new NotFoundException('Anamnese not found')
        }
    }
}