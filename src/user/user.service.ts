import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateUserDTO) {

        await this.existsCpf(data.cpf);

        const user: any = data;

        if (data.birth_date) {
            user.birth_date = new Date(data.birth_date)
        }

        if (data.number) {
            user.number = String(data.number)
        }

        if (data.cpf) {
            user.cpf = String(data.cpf)
        }

        return this.prisma.user.create({
            data: user
        });
    }

    async list() {
        return this.prisma.user.findMany()
    }

    async show(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: number, { email, name, password, birth_date, cpf, number }: UpdatePutUserDTO) {

        await this.exists(id);

        await this.existsCpf(cpf);

        if (!birth_date) {
            birth_date = null
        }

        if (number) {
            number = String(number)
        }

        return this.prisma.user.updateMany({
            data: { email, name, password, birth_date: birth_date ? new Date(birth_date) : null },
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, { email, name, password, birth_date, cpf , number}: UpdatePatchUserDTO) {

        await this.exists(id);

        const data: any = {}

        if (cpf) {
            await this.existsCpf(cpf);
            data.cpf = cpf
        }

        if (birth_date) {
            data.birth_date = new Date(birth_date)
        }

        if (name) {
            data.name = name
        }

        if (email) {
            data.email = email
        }

        if (password) {
            data.password = password
        }

        if (number) {
            data.number = String(number)
        }

        return this.prisma.user.updateMany({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: number) {

        await this.exists(id);

        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        if (!(await this.show(id))) {
            throw new NotFoundException(`O usuário ${id} não existe`)
        }
    }

    async existsCpf(cpf: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                cpf
            }
        });

        if (user) {
            throw new NotFoundException('CPF já cadastrado');
        }
    }
}