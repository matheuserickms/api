import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateProfessorDTO {
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    id : number;
    
    @IsNotEmpty()
    @IsString()
    professional_registration : string;
}