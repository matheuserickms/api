import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAppointmentDTO {
    @IsNotEmpty()
    @IsDateString()
    appointment_date: string;

    @IsOptional()
    status_id: number;

    @IsOptional()
    @IsString()
    notes: string;

    @IsOptional()
    patient_id: number;

    @IsOptional()
    professor_id: number;
}