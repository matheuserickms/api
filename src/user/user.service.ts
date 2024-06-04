import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchtUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateUserDTO) {
        return this.prisma.user.create({
            data
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

    async update(id: number, { email, name, password, birth_date }: UpdatePutUserDTO) {
        
        await this.exists(id);

        if (!birth_date) {
            birth_date = null
        }
        return this.prisma.user.updateMany({
            data: { email, name, password, birth_date: birth_date ? new Date(birth_date) : null },
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, { email, name, password, birth_date }: UpdatePatchtUserDTO) {

        await this.exists(id);

        const data: any = {}

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

    async exists(id: number){
        if(!(await this.show(id))){
            throw new NotFoundException(`O usuário ${id} não existe`)
        }
    }
}
