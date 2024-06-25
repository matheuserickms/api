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

    //show by id
    async showByPatientId(patient_id: number) {
        return this.prisma.anamnese.findMany({
            where: {
                patient_id: patient_id
            }
        });
    }

    async update(id: number, data: UpdatePutAnamneseDTO) {
        const anamnese: any = data;

        await this.exists(id);

        if (anamnese.patient_id) {
            anamnese.patient_id = parseInt(anamnese.patient_id);
            await this.existsPatient(anamnese.patient_id);
        }

        if (anamnese.consultation_reason) {
            anamnese.consultation_reason = anamnese.consultation_reason;
        } else {
            anamnese.consultation_reason = null;
        }

        if (anamnese.medical_history) {
            anamnese.medical_history = anamnese.medical_history;
        } else {
            anamnese.medical_history = null;
        }

        if (anamnese.psychological_history) {
            anamnese.psychological_history = anamnese.psychological_history;
        } else {
            anamnese.psychological_history = null;
        }

        if (anamnese.family_history) {
            anamnese.family_history = anamnese.family_history;
        } else {
            anamnese.family_history = null;
        }

        if (anamnese.disorder_history) {
            anamnese.disorder_history = anamnese.disorder_history;
        } else {
            anamnese.disorder_history = null;
        }

        if (anamnese.significant_events) {
            anamnese.significant_events = anamnese.significant_events;
        } else {
            anamnese.significant_events = null;
        }

        if (anamnese.interpersonal_relationships) {
            anamnese.interpersonal_relationships = anamnese.interpersonal_relationships;
        } else {
            anamnese.interpersonal_relationships = null;
        }

        if (anamnese.behavioral_development) {
            anamnese.behavioral_development = anamnese.behavioral_development;
        } else {
            anamnese.behavioral_development = null;
        }

        if (anamnese.emotional_development) {
            anamnese.emotional_development = anamnese.emotional_development;
        } else {
            anamnese.emotional_development = null;
        }

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
        const anamnse = await this.prisma.anamnese.findUnique({
            where: {
                id
            }
        })

        if (!anamnse) {
            throw new NotFoundException('Anamnese not found')
        }
    }

    async existsPatient(id: number) {
        const patient = await this.prisma.patient.findUnique({
            where: {
                id
            }
        })

        if (!patient) {
            throw new NotFoundException('Patient not found')
        }
    }

}