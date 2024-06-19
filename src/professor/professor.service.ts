import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProfessorDTO } from "./dto/create-professor.dto";
import { UpdatePatchProfessorDTO } from "./dto/update-patch-professor.dto";
import { UpdatePutProfessor } from "./dto/update-put-professor.dto";

@Injectable()
export class ProfessorService {
    constructor (private readonly prisma: PrismaService) { }

    async create(data: CreateProfessorDTO) {
        const professor: any = data;

        if (professor.id) {
            
            professor.id = parseInt(professor.id)

            const user = await this.prisma.user.findUnique({
                where: {
                    id: professor.id
                }
            });

            if (!user) {
                throw new NotFoundException('User not found')
            }
        } else {
            throw new NotFoundException('User not found')
        }

        if (professor.professional_registration) {
            professor.professional_registration = String(professor.professional_registration)
        }

        return this.prisma.professor.create({
            data: professor
        }); 
    }

    async list() {
        return this.prisma.professor.findMany()
    }

    async show(id: number) {
        return this.prisma.professor.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: number, data: UpdatePutProfessor) {

        await this.exists(id);

        const professor: any = data;

        if (professor.id) {
            professor.id = parseInt(professor.id)
        }

        if (professor.professional_registration) {
            professor.professional_registration = String(professor.professional_registration)
        }

        return this.prisma.professor.update({
            where: {
                id: id
            },
            data: professor
        });
    }

    async delete(id: number) {

        await this.exists(id);

        return this.prisma.professor.delete({
            where: {
                id: id
            }
        });
    }

    async exists(id: number) {
        const professor = await this.prisma.professor.findUnique({
            where: {
                id: id
            }
        });

        if (!professor) {
            throw new NotFoundException('Professor not found')
        }
    }

    async updatePartial(id: number, data: UpdatePatchProfessorDTO) {

        await this.exists(id);

        const professor: any = data;

        if (professor.id) {
            professor.id = parseInt(professor.id)
        }

        if (professor.professional_registration) {
            professor.professional_registration = String(professor.professional_registration)
        }

        return this.prisma.professor.update({
            where: {
                id: id
            },
            data: professor
        });
    }
}