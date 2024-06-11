import { IsNotEmpty, IsString } from "class-validator";

export class CreateConsultationStatusDTO {
    @IsNotEmpty()
    @IsString()
    status_name: string;
}