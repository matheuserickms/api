import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { CreateNotificationDTO } from "./dto/create-notification.dto";
import { UpdatePutNotificationDTO } from "./dto/update-put-notification.dto";
import { UpdatePatchNotificationDTO } from "./dto/update-patch-notification.dto";

@Controller('notifications')
export class NotificationController {
    constructor(private readonly NotificationService: NotificationService) { }

    @Post()
    async create(@Body() data: CreateNotificationDTO) {
        return this.NotificationService.create(data);
    }

    @Get()
    async list() {
        return this.NotificationService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.NotificationService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutNotificationDTO, @Param('id', ParseIntPipe) id: number) {
        return this.NotificationService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchNotificationDTO, @Param('id', ParseIntPipe) id: number) {
        return this.NotificationService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.NotificationService.delete(id);
    }
}