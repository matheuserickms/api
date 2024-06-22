import { IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentStatusDTO {
    id : number;

    @IsString()
    @IsNotEmpty()
    status_name : string;    
}