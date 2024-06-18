import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { NotificationTypeService } from "./notification-type.service";
import { UpdatePutNotificationTypeDTO } from "./dto/update-put-notification-type.dto";
import { CreateNotificationTypeDTO } from "./dto/create-notification-type.dto";
import { UpdatePatchNotificationTypeDTO } from "./dto/update-patch-notification-type.dto";

@Controller('notification-types')
export class NotificationTypeController {
    constructor(private readonly NotificationTypeService: NotificationTypeService) { }

    @Post()
    async create(@Body() data: CreateNotificationTypeDTO) {
        return this.NotificationTypeService.create(data);
    }

    @Get()
    async list() {
        return this.NotificationTypeService.list()
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.NotificationTypeService.show(id)
    }

    @Put(':id')
    async update(@Body() data: UpdatePutNotificationTypeDTO, @Param('id', ParseIntPipe) id: number) {
        return this.NotificationTypeService.update(id,data)
    }

    @Patch(':id')
    async updatePatch(@Body() data: UpdatePatchNotificationTypeDTO, @Param('id', ParseIntPipe) id: number) {
        return this.NotificationTypeService.updatePatch(id,data)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.NotificationTypeService.delete(id)
    }

}