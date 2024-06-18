import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateConsultationDTO } from "./dto/create-consultation.dto";

@Injectable()
export class ConsultationService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateConsultationDTO) {
        const consultation: any = data;
        if (data.schedule) {
            consultation.schedule = new Date(data.schedule)
        }

        return this.prisma.consultation.create({
            data: consultation
        });
    }

    async list(){
        return this.prisma.consultation.findMany()
    }

    async show(id: number){
        return this.prisma.consultation.findUnique({
            where: {
                id: id
            }
        })
    }

    async update(id: number, { duration, type_id, status_id, schedule, observations, appointment_id }: CreateConsultationDTO){
        await this.exists(id);

        const data: any = {}

        if (schedule) {
            data.schedule = new Date(schedule)
        }

        if (duration) {
            data.duration = parseInt(String(duration), 10);
        }

        if (type_id) {
            data.type_id = type_id;
        }

        if (status_id) {
            data.status_id = status_id;
        }

        if (observations) {
            data.observations = observations;
        }

        if (appointment_id) {
            data.appointment_id = appointment_id;
        }

        return this.prisma.consultation.updateMany({
            data: data,
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, { duration, type_id, status_id, schedule, observations, appointment_id }: CreateConsultationDTO){
        await this.exists(id);

        const data: any = {}

        if (schedule) {
            data.schedule = new Date(schedule)
        }

        if (duration) {
            data.duration = parseInt(String(duration), 10);
        }

        if (type_id) {
            data.type_id = type_id;
        }

        if (status_id) {
            data.status_id = status_id;
        }

        if (observations) {
            data.observations = observations;
        }

        if (appointment_id) {
            data.appointment_id = appointment_id;
        }

        return this.prisma.consultation.updateMany({
            data: data,
            where: {
                id
            }
        })
    }

    async delete(id: number){
        await this.exists(id);

        return this.prisma.consultation.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        const user = await this.prisma.consultation.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            throw new NotFoundException('Consultation not found');
        }
    }
}