import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateConsultationDTO } from "./dto/create-consultation.dto";

@Injectable()
export class ConsultationService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateConsultationDTO) {
        const consultation: any = data;
        if (data.schedule) {
            consultation.schedule = new Date(consultation.schedule)
        }

        if (data.duration) {
            consultation.duration = Number(consultation.duration);
        }

        if (data.type_id) {
            consultation.type_id = Number(consultation.type_id);
            await this.existsType(consultation.type_id);
        }

        if (data.status_id) {
            consultation.status_id = Number(consultation.status_id);
            await this.existsStatus(consultation.status_id);
        }

        if (data.observations) {
            consultation.observations = data.observations;
        }

        if (data.appointment_id) {
            consultation.appointment_id = Number(consultation.appointment_id);
            await this.existsAppointment(consultation.appointment_id);
        }

        return this.prisma.consultation.create({
            data: consultation
        });
    }

    async list(){
        return this.prisma.consultation.findMany({
            include: {
                consultationstatuses: true,
                consultationtypes: true,
                appointments: {
                    include: {
                        appointmentstatuses: true,
                        patients: {
                            include: {
                                users: true
                            }
                        },
                        professors: {
                            include: {
                                users: true
                            }
                        }
                    }
                }
            }
        })
    }

    async show(id: number){
        return this.prisma.consultation.findUnique({
            where: {
                id: id
            },
            include: {
                consultationstatuses: true,
                consultationtypes: true,
                appointments: {
                    include: {
                        appointmentstatuses: true,
                        patients: {
                            include: {
                                users: true
                            }
                        },
                        professors: {
                            include: {
                                users: true
                            }
                        }
                    }
                }
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
            data.type_id = Number(type_id);
            await this.existsType(data.type_id);
        }

        if (status_id) {
            data.status_id = Number(status_id);
            await this.existsStatus(data.status_id);
        }

        if (observations) {
            data.observations = observations;
        }

        if (appointment_id) {
            data.appointment_id = Number(appointment_id);
            await this.existsAppointment(data.appointment_id);
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
            data.type_id = Number(type_id);
            await this.existsType(data.type_id);
        }

        if (status_id) {
            data.status_id = Number(status_id);
            await this.existsStatus(data.status_id);
        }

        if (observations) {
            data.observations = observations;
        }

        if (appointment_id) {
            data.appointment_id = Number(appointment_id);
            await this.existsAppointment(data.appointment_id);
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

    async existsStatus(id: number) {
        const user = await this.prisma.consultationStatus.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            throw new NotFoundException('Consultation status not found');
        }
    }

    async existsType(id: number) {
        const user = await this.prisma.consultationType.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            throw new NotFoundException('Consultation type not found');
        }
    }

    async existsAppointment(id: number) {
        const user = await this.prisma.appointment.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            throw new NotFoundException('Appointment not found');
        }
    }
}