import { IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationTypeDTO {
    @IsString()
    @IsNotEmpty()
    type_name: string;
}