import { Type } from "class-transformer";
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateConsultationDTO {
    /*
    duration             Int
    type_id              Int?
    status_id            Int?
    schedule             DateTime 
    observations         String?
    appointment_id       Int? */

    @IsNotEmpty()
    // @IsInt()
    // @Type(() => Number)
    // @Min(1)
    // @Max(120)
    duration: number;

    @IsOptional()
    // @IsInt()
    type_id: number;

    @IsOptional()
    // @IsInt()
    status_id: number;

    @IsNotEmpty()
    @IsDateString()
    schedule: string;

    @IsOptional()
    @IsString()
    observations: string;

    @IsOptional()
    // @IsInt()
    appointment_id: number;
}