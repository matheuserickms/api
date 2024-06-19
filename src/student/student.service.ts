import { Injectable, NotFoundException, ParseIntPipe } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateStudentDTO } from "./dto/create-student.dto";
import { UpdatePatchStudentDTO } from "./dto/update-patch-student.dto";
import { UpdatePutStudentDTO } from "./dto/update-put-student.dto";


@Injectable()
export class StudentService {
    constructor(private readonly primas: PrismaService) { }

    async create(data: CreateStudentDTO) {

        const student: any = data;


        student.id = Number(data.id);

        await this.existsUser(student.id);


        if (data.semester) {
            student.semester = Number(data.semester);
        }

        if (data.advisor_id) {
            student.advisor_id = Number(data.advisor_id);
        }

        if (data.registration) {
            student.registration = String(data.registration);
        }

        return this.primas.student.create({
            data: student
        });
    }

    async list() {
        return this.primas.student.findMany();
    }

    async show(id: number) {
        return this.primas.student.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: number, { registration, semester, advisor_id }: UpdatePutStudentDTO) {

        const student: any = {};

        await this.exists(id);
        
        student.registration = String(registration);

        student.semester = parseInt(String(semester));

        student.advisor_id = parseInt(String(advisor_id));

        return this.primas.student.update({
            where: {
                id: id
            },
            data: student
        });
    }

    async updatePartial(id: number, { registration, semester, advisor_id }: UpdatePatchStudentDTO) {

        await this.exists(id);

        const data: any = {}

        if (registration) {
            data.registration = registration
        }

        if (semester) {
            data.semester = parseInt(String(semester))
        }

        if (advisor_id) {
            data.advisor_id = parseInt(String(advisor_id))
        }

        return this.primas.student.update({
            where: {
                id: id
            },
            data
        });
    }

    async delete(id: number) {
        await this.exists(id);

        return this.primas.student.delete({
            where: {
                id: id
            }
        });
    }

    async exists(id: number) {
        const student = await this.primas.student.findUnique({
            where: {
                id: id
            }
        });

        if (!student) {
            throw new NotFoundException('Student not found');
        }
    }

    async existsUser(id: number) {
        const user = await this.primas.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }
    }
}