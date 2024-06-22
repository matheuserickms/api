import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAppointmentStatusDTO } from "./dto/create-appointment-status.dto";

@Injectable()
export class AppointmentStatusService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateAppointmentStatusDTO) {

        const appointmentStatus: any = data;

        if (data.id) {
            appointmentStatus.id = Number(data.id);
            await this.alreadyExists(data.id);
        }

        return this.prisma.appointmentStatus.create({
            data : appointmentStatus
        });
    }

    async list() {
        return this.prisma.appointmentStatus.findMany();
    }

    async show(id: number) {
        return this.prisma.appointmentStatus.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: number, data: CreateAppointmentStatusDTO) {
        await this.exists(id);
        return this.prisma.appointmentStatus.update({
            data,
            where: {
                id
            }
        });
    }

    async delete(id: number) {
        await this.exists(id);
        return this.prisma.appointmentStatus.delete({
            where: {
                id
            }
        });
    }

    async exists(id: number) {
        const user = await this.prisma.appointmentStatus.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            throw new NotFoundException('Appointment status not found');
        }
    }

    async alreadyExists(id: number) {
        const user = await this.prisma.appointmentStatus.findUnique({
            where: {
                id
            }
        });

        if (user) {
            throw new NotFoundException('Appointment status already exists');
        }
    }

    async updatePartial(id: number, data: CreateAppointmentStatusDTO) {
        return this.prisma.appointmentStatus.update({
            data,
            where: {
                id
            }
        });
    }
}