import { Type } from "class-transformer";
import { IsString, IsEmail, IsStrongPassword, IsOptional, IsDateString, IsInt, IsEnum } from "class-validator";
import { Role } from "src/enum/role.enum";

export class CreateUserDTO {
    @IsOptional()
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

// @IsString()
    cpf: string;

    // @IsString()
    number: string;

    // @IsString()
    zip_code: string;

    phone: string;

    address: string;

    complement: string;
    
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsEnum(Role)
    role: Role;
}