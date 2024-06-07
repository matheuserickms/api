import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentDTO {
    @IsNotEmpty()
    @IsDateString()
    appointment_date: string;

    @IsString()
    status_id: string;

    @IsString()
    notes: string;

    patient_id: number;

    professor_id: number;
}