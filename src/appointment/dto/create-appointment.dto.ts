import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAppointmentDTO {
    @IsNotEmpty()
    @IsDateString()
    appointment_date: string;

    @IsNotEmpty()
    status_id: number;

    @IsOptional()
    @IsString()
    notes: string;

    @IsNotEmpty()
    patient_id: number;

    @IsNotEmpty()
    professor_id: number;
}