import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePatientDTO {
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    id: number;

    @IsString()
    @IsOptional()
    allergies: string;

    @IsString()
    @IsOptional()
    medical_conditions: string;
}