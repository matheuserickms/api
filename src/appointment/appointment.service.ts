import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAppointmentDTO } from "./dto/create-appointment.dto";

@Injectable()
export class AppointmentService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateAppointmentDTO) {

        const appointment: any = data;

        if (appointment.appointment_date) {
            appointment.appointment_date = new Date(appointment.appointment_date);
        }

        if (appointment.status_id) {
            appointment.status_id = Number(appointment.status_id);

            this.existsStatus(appointment.status_id);
        }

        if (appointment.notes) {
            appointment.notes = String(appointment.notes);
        }

        if (appointment.patient_id) {
            appointment.patient_id = Number(appointment.patient_id);
            this.existsPatient(appointment.patient_id);
        }

        if (appointment.professor_id) {
            appointment.professor_id = Number(appointment.professor_id);

            this.existsProfessor(appointment.professor_id);
        }

        return this.prisma.appointment.create({
            data: appointment
        });
    }


    async list() {
        return this.prisma.appointment.findMany({
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
        })
    }

    async show(id: number) {
        return this.prisma.appointment.findUnique({
            where: {
                id: id
            },
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
        });
    }

    async update(id: number, { appointment_date, status_id, notes, patient_id, professor_id }: any) {

        await this.exists(id);

        const data: any = {}

        if (appointment_date) {
            data.appointment_date = new Date(appointment_date);
        } else {
            data.appointment_date = null;
        }

        if (status_id) {
            data.status_id = parseInt(status_id);

            await this.existsStatus(data.status_id);
        }

        if (notes) {
            data.notes = notes;
        }

        if (patient_id) {
            data.patient_id = parseInt(patient_id);
            await this.existsPatient(data.patient_id);
        }

        if (professor_id) {
            data.professor_id = parseInt(professor_id);
            await this.existsProfessor(data.professor_id);
        }

        return this.prisma.appointment.updateMany({
            data: data,
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, { appointment_date, status_id, notes, patient_id, professor_id }: any) {

        await this.exists(id);

        const data: any = {}

        if (appointment_date) {
            data.appointment_date = new Date(appointment_date);
        }

        if (status_id) {
            data.status_id = parseInt(status_id);
            await this.existsStatus(data.status_id);
        }

        if (notes) {
            data.notes = notes;
        }

        if (patient_id) {
            data.patient_id = parseInt(patient_id);
            await this.existsPatient(data.patient_id);
        }

        if (professor_id) {
            data.professor_id = parseInt(professor_id);
            await this.existsProfessor(data.professor_id);
        }

        return this.prisma.appointment.updateMany({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: number) {
        await this.exists(id);

        return this.prisma.appointment.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        const user = await this.prisma.appointment.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            throw new NotFoundException('Appointment not found');
        }
    }

    async existsUser(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }
    }

    async existsPatient(id: number) {
        const patient = await this.prisma.patient.findUnique({
            where: {
                id
            }
        });

        if (!patient) {
            throw new NotFoundException('Patient not found');
        }
    }

    async existsProfessor(id: number) {
        const professor = await this.prisma.professor.findUnique({
            where: {
                id
            }
        });

        if (!professor) {
            throw new NotFoundException('Professor not found');
        }
    }

    async existsStatus(id: number) {
        const status = await this.prisma.appointmentStatus.findUnique({
            where: {
                id
            }
        });

        if (!status) {
            throw new NotFoundException('Status not found');
        }
    }
}
