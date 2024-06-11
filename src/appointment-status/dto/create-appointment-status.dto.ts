import { IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentStatusDTO {
    @IsString()
    @IsNotEmpty()
    status_name : string;    
}