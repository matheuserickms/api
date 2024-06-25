import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateClinicalRecordDTO } from "./dto/create-clinical-recrod.dto";
import { parse } from "path";
import { UpdatePatchClinicalRecordDTO } from "./dto/update-patch-clinical-record.dto";
import { UpdatePutClinicalRecordDTO } from "./dto/update-put-clinical-record.dto";

@Injectable()
export class ClinicalRecordService {

    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateClinicalRecordDTO) {

        const clinicalRecord: any = data;

        if (clinicalRecord.patient_id) {
            clinicalRecord.patient_id = parseInt(clinicalRecord.patient_id);
        }

        return this.prisma.clinicalRecord.create({
            data: clinicalRecord
        });
    }

    async list() {
        return this.prisma.clinicalRecord.findMany()
    }

    //list by idPatient
    async listByIdPatient(id: number) {
        return this.prisma.clinicalRecord.findMany({
            where: {
                patient_id: id
            },
            orderBy: {
                created_at: 'desc'
            }
        });
    }

    async show(id: number) {
        return this.prisma.clinicalRecord.findUnique({
            where: {
                id: id
            }
        });
    }
    async update(id: number, data: UpdatePutClinicalRecordDTO) {
        await this.exists(id);

        return this.prisma.clinicalRecord.update
            ({
                where: { id },
                data
            });

    }

    async exists(id: number) {
        const appointment = await this.prisma.clinicalRecord.findUnique({
            where: {
                id
            }
        });

        if (!appointment) {
            throw new NotFoundException('Clinical Record not found');
        }
    }

    async delete(id: number) {
        await this.exists(id);

        return this.prisma.clinicalRecord.delete({
            where: {
                id
            }
        });
    }

    async updatePartial(id: number, data: UpdatePatchClinicalRecordDTO) {
        await this.exists(id);

        const clinicalRecord: any = data;

        if (clinicalRecord.patient_id) {
            clinicalRecord.patient_id = parseInt(clinicalRecord.patient_id);
        }

        if (clinicalRecord.diagnosis) {
            clinicalRecord.diagnosis = clinicalRecord.diagnosis;
        }

        if (clinicalRecord.previous_treatments) {
            clinicalRecord.previous_treatments = clinicalRecord.previous_treatments;
        }

        if (clinicalRecord.session_notes) {
            clinicalRecord.session_notes = clinicalRecord.session_notes;
        }

        if (clinicalRecord.patient_progress) {
            clinicalRecord.patient_progress = clinicalRecord.patient_progress;
        }

        if (clinicalRecord.intervention_strategy) {
            clinicalRecord.intervention_strategy = clinicalRecord.intervention_strategy;
        }

        if (clinicalRecord.observations) {
            clinicalRecord.observations = clinicalRecord.observations;
        }

        return this.prisma.clinicalRecord.update({
            where: {
                id
            },
            data: clinicalRecord
        });
    }

}