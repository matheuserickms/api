import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateNotificationTypeDTO } from "./dto/create-notification-type.dto";
import { UpdatePutNotificationTypeDTO } from "./dto/update-put-notification-type.dto";
import { UpdatePatchNotificationTypeDTO } from "./dto/update-patch-notification-type.dto";

@Injectable()
export class NotificationTypeService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateNotificationTypeDTO) {

        const notificationType: any = data;

        return this.prisma.notificationType.create({
            data: notificationType
        });
    }

    async list() {
        return this.prisma.notificationType.findMany();
    }

    async show(id: number) {
        await this.exists(id);
        return this.prisma.notificationType.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: number, data: UpdatePutNotificationTypeDTO) {
        await this.exists(id);

        const notificationType:any = data;
        return this.prisma.notificationType.update({
            where: {
                id
            },
            data: notificationType
        });
    }

    async updatePatch(id: number, data: UpdatePatchNotificationTypeDTO) {

        await this.exists(id);
        const notificationType :any = {};
        notificationType.type_name = data.type_name;
        return this.prisma.notificationType.update({
            where: {
                id
            },
            data: notificationType
        });
    }

    async delete(id: number) {

        await this.exists(id);

        return this.prisma.notificationType.delete({
            where: {
                id
            }
        });
    }

    private async exists(id: number) {
        const notification = await this.prisma.notificationType.findUnique({
            where: {
                id
            }
        });

        if (!notification) {
            throw new NotFoundException('Notification not found');
        }
    }
}