import { Body, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateConsultationTypeDTO } from "./dto/create-consultation-type.dto";
import { UpdatePutConsultationTypeDTO } from "./dto/update-put-consultation-type.dto";
import { UpdatePatchConsultationTypeDTO } from "./dto/update-patch-consultation-type.dto";

@Injectable()
export class ConsultationTypeService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateConsultationTypeDTO) {

        const consultationType: any = data;

        return this.prisma.consultationType.create({
            data: consultationType
        })
    }

    async list() {
        return this.prisma.consultationType.findMany()
    }

    async show(id: number) {

        return this.prisma.consultationType.findUnique({
            where: {
                id: id
            }
        })
    }

    async update(id: number, data: UpdatePutConsultationTypeDTO) {
        await this.exists(id);
        const consultationType: any = data;

        return this.prisma.consultationType.updateMany({
            data: consultationType,
            where: {
                id: id
            }
        })
    }

    async updatePartial(id: number, data: UpdatePatchConsultationTypeDTO){
        await this.exists(id);
        const consultationType: any = data;

        return this.prisma.consultationType.updateMany({
            data: consultationType,
            where: {
                id:id
            }
        })
    }

    async delete(id:number){

        await this.exists(id);

        return this.prisma.consultationType.delete({
            where: {
                id:id
            }
        })
    }

    async exists(id:number){
        if(!(await this.show(id))){
            throw new NotFoundException(`Consultation Type with ID ${id} not found`)
        }
    }
}