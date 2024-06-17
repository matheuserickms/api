import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { ConsultationTypeService } from "./consultation-type.service";
import { CreateConsultationTypeDTO } from "./dto/create-consultation-type.dto";
import { UpdatePutConsultationTypeDTO } from "./dto/update-put-consultation-type.dto";
import { UpdatePatchConsultationTypeDTO } from "./dto/update-patch-consultation-type.dto";

@Controller('consultation-types')
export class ConsultationTypeController {
    constructor(private readonly ConsultationTypeService: ConsultationTypeService) { } 

    @Post()
    async create(@Body() data: CreateConsultationTypeDTO) {
        return this.ConsultationTypeService.create(data);
    }

    @Get()
    async list() {
        return this.ConsultationTypeService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.ConsultationTypeService.show(id);
    }


    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePutConsultationTypeDTO) {
        return this.ConsultationTypeService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePatchConsultationTypeDTO) {
        return this.ConsultationTypeService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.ConsultationTypeService.delete(id);
    }
}