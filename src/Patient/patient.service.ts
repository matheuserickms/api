import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePatientDTO } from "./dto/create-patient.dto";
import { UpdatePutPatientDTO } from "./dto/update-put-patient.dto";
import { UpdatePatchPatientDTO } from "./dto/update-patch-patient.dto";


@Injectable()
export class PatientService {

    constructor(private readonly prisma: PrismaService) { }
    async create(data: CreatePatientDTO) {
        const patient: any = data;

        if (data.id){
            patient.id = parseInt(patient.id);
        }

        return this.prisma.patient.create({
            data: patient
        });
    }

    async list() {
        return this.prisma.patient.findMany()
    }

    async show(id: number) {
        return this.prisma.patient.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: number, { allergies, medical_conditions }: UpdatePutPatientDTO) {

        await this.exists(id);

        allergies = allergies || null;

        medical_conditions = medical_conditions || null;

        return this.prisma.patient.updateMany({
            data: { allergies, medical_conditions },
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, { allergies, medical_conditions }: UpdatePatchPatientDTO) {

        await this.exists(id);

        const data: any = {}

        if (allergies) {
            data.allergies = allergies
        }

        if (medical_conditions) {
            data.medical_conditions = medical_conditions
        }

        return this.prisma.patient.updateMany({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: number) {

        await this.exists(id);

        return this.prisma.patient.delete({
            where: {
                id
            }
        });
    }

    private async exists(id: number) {
        const patient = await this.prisma.patient.findUnique({
            where: {
                id
            }
        });

        if (!patient) {
            throw new NotFoundException('Patient not found');
        }
    }
}