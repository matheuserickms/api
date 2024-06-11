import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDTO } from "./dto/create-appointment.dto";

@Controller('appointments')
export class AppointmentController {
    constructor(private readonly AppointmentService: AppointmentService) {}

    @Post()
    async create(@Body() data: CreateAppointmentDTO) {
        return this.AppointmentService.create(data);
    }

    @Get()
    async list() {
        return this.AppointmentService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.AppointmentService.show(id);
    }

    @Put(':id')
    async update(@Body() data: any, @Param('id', ParseIntPipe) id:number) {
        return this.AppointmentService.update(id,data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: any, @Param('id', ParseIntPipe) id:number) {
        return this.AppointmentService.updatePartial(id,data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number) {
        return this.AppointmentService.delete(id);
    }
}