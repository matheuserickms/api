import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { ConsultationService } from "./consultation.service";
import { CreateConsultationDTO } from "./dto/create-consultation.dto";
import { UpdatePutConsultationDTO } from "./dto/update-put-consultatio.dto";
import { UpdatePatchConsultationDTO } from "./dto/update-patch-consultation.dto";

@Controller('consultations')
export class ConsultationController {

    constructor(private readonly ConsultationService: ConsultationService) { }

    @Post()
    //passar o tipo de dado que vai ser recebido
    async create(@Body() data: CreateConsultationDTO ) {

        const consultation: any = data;

        if (data.schedule) {
            consultation.schedule = new Date(data.schedule)
        }

        if (data.duration) {
            consultation.duration = parseInt(String(data.duration), 10);
        }

        return this.ConsultationService.create(consultation);
    }

    @Get()
    async list(){
        return this.ConsultationService.list()
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.ConsultationService.show(id)
    }

    @Put(':id')
    async update(@Body() data: UpdatePutConsultationDTO, @Param('id', ParseIntPipe) id: number) {

        const consultation: any = data;

        if (data.schedule) {
            consultation.schedule = new Date(data.schedule)
        }   

        if (data.duration) {
            consultation.duration = parseInt(String(data.duration), 10);
        }

        return this.ConsultationService.update(id, consultation)
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchConsultationDTO, @Param('id', ParseIntPipe) id: number) {

        const consultation: any = data;

        if (data.schedule) {
            consultation.schedule = new Date(data.schedule)
        }   

        if (data.duration) {
            consultation.duration = parseInt(String(data.duration), 10);
        }

        return this.ConsultationService.update(id, consultation)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        
        return this.ConsultationService.delete(id)
    }
}