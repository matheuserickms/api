import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateConsultationStatusDTO } from "./dto/create-consultation-status.dto";
import { UpdatePutConsultationStatus } from "./dto/update-put-consultation-status.dto";
import { UpdatePatchConsultationStatusDTO } from "./dto/update-patch-consultation-status.dto";

@Injectable()
export class ConsultationStatusService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateConsultationStatusDTO) {
        return this.prisma.consultationStatus.create({
            data
        });
    }

    async list() {
        return this.prisma.consultationStatus.findMany()
    }

    async show(id: number) {
        return this.prisma.consultationStatus.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: number, data: UpdatePutConsultationStatus) {
        await this.exists(id);

        return this.prisma.consultationStatus.update
        ({
            data,
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, data: UpdatePatchConsultationStatusDTO) {
        await this.exists(id);

        return this.prisma.consultationStatus.update({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: number) {
        await this.exists(id);

        return this.prisma.consultationStatus.delete({
            where: {
                id
            }
        })
    }

    private async exists(id: number) {
        const user = await this.prisma.consultationStatus.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            throw new NotFoundException('Consultation Status not found');
        }
    }

}