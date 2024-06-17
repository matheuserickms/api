import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNotificationDTO {
    @IsInt()
    @IsOptional()
    type_id: number;

    @IsDateString()
    @IsNotEmpty()
    send_date: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsInt()
    @IsOptional()
    recipient_id: number;
}
