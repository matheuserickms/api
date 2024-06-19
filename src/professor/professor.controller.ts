import { Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { CreateProfessorDTO } from "./dto/create-professor.dto";
import { UpdatePutProfessor } from "./dto/update-put-professor.dto";
import { UpdatePatchProfessorDTO } from "./dto/update-patch-professor.dto";
import { ProfessorService } from "./professor.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";

@Controller('professors')
export class ProfessorController { 

    constructor(private readonly professorService: ProfessorService) { }

    @Post()
    async create(@Body() data: CreateProfessorDTO) {
        return this.professorService.create(data);
    }

    @Get()
    async list() {
        return this.professorService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.professorService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutProfessor, @Param('id', ParseIntPipe) id: number) {
        return this.professorService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchProfessorDTO, @Param('id', ParseIntPipe) id: number) {
        return this.professorService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.professorService.delete(id);
    }
}