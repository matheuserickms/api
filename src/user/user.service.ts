import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import * as bcryptc from 'bcrypt';
import { hash } from "crypto";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateUserDTO) {

        await this.existsCpf(data.cpf, null);

        const user: any = data;

        if (data.birth_date) {
            user.birth_date = new Date(data.birth_date);
        }

        if (data.number) {
            user.number = String(data.number);
        }

        if (data.cpf) {
            user.cpf = String(data.cpf);
        }

        if (data.zip_code) {
            user.zip_code = String(data.zip_code);
        }

        if (data.role){
            user.role = parseInt(user.role);
        }

        user.password = data.password;

        user.password = await bcryptc.hash(data.password, await bcryptc.genSalt());

        return this.prisma.user.create({
            data: user
        });
    }

    async list() {
        //trazer dados de professor e patient
        return this.prisma.user.findMany()
    }

    async show(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: number, { email, name, password, birth_date, cpf, number, phone, address, complement, zip_code, role }: UpdatePutUserDTO) {
        
        await this.exists(id);

        await this.existsCpf(cpf, id);

        if (!birth_date) {
            birth_date = null
        }

        if (number) {
            number = String(number)
        }

        if (cpf) {
            cpf = String(cpf)
        }

        if (zip_code) {
            zip_code = String(zip_code)
        }

        if (role) {
            role = parseInt(String(role));
        }

        if(password){
            password = await bcryptc.hash(password, await bcryptc.genSalt());
        }

        return this.prisma.user.updateMany({
            data: { email, name, password, birth_date: birth_date ? new Date(birth_date) : null, cpf, number, phone, address, complement, zip_code},
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, { email, name, password, birth_date, cpf, number, role }: UpdatePatchUserDTO) {

        await this.exists(id);

        const data: any = {}

        if (cpf) {
            await this.existsCpf(cpf, id);
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

        if (role) {
            data.role = parseInt(String(role));
        }

        if (password) {
            data.password = await bcryptc.hash(password, await bcryptc.genSalt());
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

    async existsCpf(cpf: string, id: number) {

        const where_id = (id) ? { id: { not: id } } : {};

        const user = await this.prisma.user.findMany({
            where: {
                //cpf : cpf,
                //id não pode ser igual ao id que está sendo atualizado
                //id: {
                //    not: id
                //}
                //cpf igual ao cpf e id diferente do id que está sendo atualizado
                AND: [
                    {
                        cpf: cpf
                    },
                    where_id
                ]
            }
        });

        if (user.length > 0) {
            throw new NotFoundException('CPF já cadastrado');
        }
    }
}