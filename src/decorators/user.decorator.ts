import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((filters: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (request.user){
        if (filters){
            return request.user[filters];
        }else{
            return request.user;
        }
    } else {
        throw new NotFoundException("User not found, use AuthGuard to protect routes");
    }
});