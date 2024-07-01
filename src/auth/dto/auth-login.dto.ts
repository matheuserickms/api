import { IsDateString, IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { CreateUserDTO } from "src/user/dto/create-user.dto";

export class AuthLoginDTO extends CreateUserDTO { }