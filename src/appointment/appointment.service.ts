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

        return this.prisma.appointment.create({
            data: appointment
        });
    }


    async list() {
        return this.prisma.appointment.findMany()
    }

    async show(id: number) {
        return this.prisma.appointment.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: number, { appointment_date, status_id, notes, patient_id, professor_id }: any) {

        await this.exists(id);

        const data: any = {}

        if (appointment_date) {
            data.appointment_date = new Date(appointment_date);
        }else{
            data.appointment_date = null;
        }

        return this.prisma.appointment.updateMany({
            data: { appointment_date, status_id, notes, patient_id, professor_id },
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

        if(status_id){
            data.status_id = status_id;
        }

        if(notes){
            data.notes = notes;
        }

        if(patient_id){
            data.patient_id = patient_id;
        }

        if(professor_id){
            data.professor_id = professor_id;
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
}
