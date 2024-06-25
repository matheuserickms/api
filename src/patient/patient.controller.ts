import { Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { PatientService } from "./patient.service";
import { CreatePatientDTO } from "./dto/create-patient.dto";
import { UpdatePutPatientDTO } from "./dto/update-put-patient.dto";
import { UpdatePatchPatientDTO } from "./dto/update-patch-patient.dto";
import { LogInterceptor } from "src/interceptors/log.interceptor";

@Controller('patients')
export class PatientController {
    constructor (private readonly patientService: PatientService) { }
    @Post()
    async create(@Body() data: CreatePatientDTO) {
        return this.patientService.create(data);
    }

    @Get()
    async list() {
        return this.patientService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.patientService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutPatientDTO, @Param('id', ParseIntPipe) id: number) {
        return this.patientService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchPatientDTO, @Param('id', ParseIntPipe) id: number) {
        return this.patientService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.patientService.delete(id);
    }
}