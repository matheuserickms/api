import { Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe, UseInterceptors, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { Roles } from "src/decorators/roles.decoretor";
import { Role } from "src/enum/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

@UseGuards(AuthGuard,RoleGuard)
@Controller('users')
export class UserController {

    constructor(private readonly UserService: UserService ){ }
    // @UseInterceptors(LogInterceptor)
    @Roles(Role.Admin)
    @Post()
    async create(@Body() data: CreateUserDTO) {
        console.log('entrou aqui');
        return this.UserService.create(data);
    }

    @Roles(Role.Admin, Role.User)
    @Get()
    async list() {
        return this.UserService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
       return this.UserService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutUserDTO, @Param('id', ParseIntPipe) id:number) {
        return this.UserService.update(id,data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id:number) {
        return this.UserService.updatePartial(id,data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number) {
        return this.UserService.delete(id);
    }
}