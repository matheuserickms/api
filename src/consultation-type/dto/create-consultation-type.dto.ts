import { IsNotEmpty, IsString } from "class-validator";

export class CreateConsultationTypeDTO {
    @IsString()
    @IsNotEmpty()
    type_name: string
}