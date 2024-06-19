import { Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { StudentService } from "./student.service";
import { CreateStudentDTO } from "./dto/create-student.dto";
import { UpdatePutStudentDTO } from "./dto/update-put-student.dto";
import { UpdatePatchStudentDTO } from "./dto/update-patch-student.dto";

@Controller('students')
export class StudentController {
    constructor(private readonly StudentService: StudentService ) { }

    @Post()
    async create(@Body() data: CreateStudentDTO) {
        return this.StudentService.create(data);
    }

    @Get()
    async list() {
        return this.StudentService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.StudentService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutStudentDTO, @Param('id', ParseIntPipe) id:number) {
        return this.StudentService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchStudentDTO, @Param('id', ParseIntPipe) id:number) {
        return this.StudentService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number) {
        return this.StudentService.delete(id);
    }
}