import { BadRequestException, Body, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import * as bcryptc from 'bcrypt';

@Injectable()
export class AuthService {

    private issuer = 'login';
    private audience = 'users';
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly UserService: UserService
    ) { }
    
    createToken(user: User) {

        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                email: user.email
            }, {
                expiresIn: '1d',
                subject: user.id.toString(),
                issuer: this.issuer,
                audience: this.audience
            })
        }
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                audience: this.audience,
                issuer: this.issuer
            });
            return data;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token)
            return true;
        } catch (e) {
            return false;
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        if (!await bcryptc.compare(password, user.password)){
            throw new UnauthorizedException('Invalid credentials')
        }

        return this.createToken(user)
    }

    async forget(email: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        return true;
    }

    async reset(password: string, token: string) {
        const id = 0
        const user = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                password
            }
        })

        return this.createToken(user)
    }

    // @Post('register')
    async register(data: AuthRegisterDTO) {
        const user = await this.UserService.create(data)
        return this.createToken(user)
    }
}