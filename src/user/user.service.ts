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

    async update(id: number, { email, name, password, birthAt }: UpdatePutUserDTO) {
        
        await this.exists(id);

        if (!birthAt) {
            birthAt = null
        }
        return this.prisma.user.updateMany({
            data: { email, name, password, birthAt: birthAt ? new Date(birthAt) : null },
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, { email, name, password, birthAt }: UpdatePatchtUserDTO) {

        await this.exists(id);

        const data: any = {}

        if (birthAt) {
            data.birthAt = new Date(birthAt)
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
