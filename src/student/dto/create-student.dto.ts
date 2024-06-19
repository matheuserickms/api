import { IsInt, IsNotEmpty } from "class-validator";

export class CreateStudentDTO {
    @IsNotEmpty()
    // @IsInt()
    id: number;

    @IsNotEmpty()
    registration: string;

    @IsNotEmpty()
    // @IsInt()
    semester: number;

    @IsNotEmpty()
    // @IsInt()
    advisor_id: number;
}