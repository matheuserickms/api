import { IsString, IsEmail, IsStrongPassword, IsOptional, IsDateString } from "class-validator";

export class CreateUserDTO {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6
    })
    password: string;

    @IsOptional()
    @IsDateString()
    birth_date: string;

    @IsString()
    cpf: string;

    @IsString()
    number: string;
}