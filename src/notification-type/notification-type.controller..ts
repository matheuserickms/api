import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { NotificationTypeService } from "./notification-type.service";
import { UpdatePutNotificationTypeDTO } from "./dto/update-put-notification-type.dto";
import { CreateNotificationTypeDTO } from "./dto/create-notification.dto";

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

}