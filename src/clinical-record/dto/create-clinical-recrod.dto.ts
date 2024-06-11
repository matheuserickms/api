import { IsOptional, IsString } from "class-validator";

export class CreateClinicalRecordDTO {
    
    patient_id: number;

    @IsOptional()
    @IsString()
    diagnosis: string;

    @IsOptional()
    @IsString()
    previous_treatments: string;

    @IsOptional()
    @IsString()
    session_notes: string;

    @IsOptional()
    @IsString()
    patient_progress: string;

    @IsOptional()
    @IsString()
    intervention_strategy: string;

    @IsOptional()
    @IsString()
    observations: string;
}