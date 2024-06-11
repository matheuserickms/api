import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { ConsultationStatusService } from "./consultation-status.service";
import { CreateConsultationStatusDTO } from "./dto/create-consultation-status.dto";
import { UpdatePutConsultationStatus } from "./dto/update-put-consultation-status.dto";
import { UpdatePatchConsultationStatusDTO } from "./dto/update-patch-consultation-status.dto";

@Controller('consultations-status')
export class ConsultationStatusController {
    constructor(private readonly ConsultationStatusService: ConsultationStatusService) { }

    @Post()
    async create(@Body() data: CreateConsultationStatusDTO) {
        return this.ConsultationStatusService.create(data);
    }

    @Get()
    async list() {
        return this.ConsultationStatusService.list();
    }


    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.ConsultationStatusService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutConsultationStatus, @Param('id', ParseIntPipe) id: number) {
        return this.ConsultationStatusService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchConsultationStatusDTO, @Param('id', ParseIntPipe) id: number) {
        return this.ConsultationStatusService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.ConsultationStatusService.delete(id);
    }
}
