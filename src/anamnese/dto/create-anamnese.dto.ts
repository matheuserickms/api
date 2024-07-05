import { IsInt, IsNumber, IsOptional } from "class-validator";

export class CreateAnamneseDTO {
    //implementar regras
    @IsOptional()
    id: number;
    //@IsInt()
    patient_id: number;
}