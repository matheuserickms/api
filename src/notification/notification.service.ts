import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateNotificationDTO } from "./dto/create-notification.dto";
import { UpdatePutNotificationDTO } from "./dto/update-put-notification.dto";
import { UpdatePatchNotificationDTO } from "./dto/update-patch-notification.dto";

@Injectable()
export class NotificationService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateNotificationDTO){
        const notification: any = data;

        if (data.send_date) {
            notification.send_date = new Date(notification.send_date)
        }

        if(data.recipient_id){
            notification.recipient_id = parseInt(notification.recipient_id)
        }

        if(data.type_id){
            notification.type_id = parseInt(notification.type_id)
        }

        return this.prisma.notification.create({
            data: notification
        });
    }

    async list(){
        return this.prisma.notification.findMany();
    }

    async show(id: number){
        
        await this.exists(id);

        return this.prisma.notification.findUnique({
            where: {
                id: id
            }
        });
    }

    async update(id: number, data: UpdatePutNotificationDTO){
        await this.exists(id);

        const notification: any = data;

        if (data.send_date) {
            notification.send_date = new Date(notification.send_date)
        }

        if(data.recipient_id){
            notification.recipient_id = parseInt(notification.recipient_id)
        }

        if(data.type_id){
            notification.type_id = parseInt(notification.type_id)
        }

        return this.prisma.notification.updateMany({
            data: notification,
            where: {
                id
            }
        });
    }

    async updatePartial(id: number, data: UpdatePatchNotificationDTO){
        await this.exists(id);

        const notification: any = {};

        if (data.send_date) {
            notification.send_date = new Date(notification.send_date)
        }

        if(data.recipient_id){
            notification.recipient_id = parseInt(notification.recipient_id)
        }

        if(data.type_id){
            notification.type_id = parseInt(notification.type_id)
        }

        if(data.content){
            notification.content = data.content
        }

        return this.prisma.notification.updateMany({
            data: notification,
            where: {
                id
            }
        });
    }

    async delete(id: number){
        await this.exists(id);

        return this.prisma.notification.delete({
            where: {
                id
            }
        });
    }
    
    async exists(id: number){
        const notification = await this.prisma.notification.findUnique({
            where: {
                id
            }
        });

        if(!notification){
            throw new NotFoundException(`Notification with id ${id} not found`);
        }
    }
}