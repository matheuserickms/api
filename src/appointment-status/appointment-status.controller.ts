import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateAppointmentStatusDTO } from "./dto/create-appointment-status.dto";
import { AppointmentStatusService } from "./appointment-status.service";

@Controller('appointments-status')
export class AppointmentStatusController {
    constructor(private readonly appointmentStatusService: AppointmentStatusService) {

    }
    @Post()
    async create(@Body() data: CreateAppointmentStatusDTO) {
        return this.appointmentStatusService.create(data);
    }

    @Get()
    async list() {
        return this.appointmentStatusService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.appointmentStatusService.show(id);
    }

    @Put(':id')
    async update(@Body() data: CreateAppointmentStatusDTO, @Param('id', ParseIntPipe) id: number) {
        return this.appointmentStatusService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: CreateAppointmentStatusDTO, @Param('id', ParseIntPipe) id: number) {
        return this.appointmentStatusService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.appointmentStatusService.delete(id);
    }
}