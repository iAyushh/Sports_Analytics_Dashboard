import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "src/user";
import { Strategy } from "passport-local";
import { ValidatedUser } from "src/common/types";
import { UnauthorizedException } from "@nestjs/common";
import { LOCAL_AUTH } from "src/auth/auth.constants";



export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_AUTH){
    constructor(private readonly userService:UserService){
        super({
            usernameField: "username",
            passwordField:"password",
        })
    }
    async validate(username:string,password:string):Promise<ValidatedUser> {
        const user= await this.userService.validateCredentials(username,password);
        if(!user){
            throw new UnauthorizedException()
        }
        return user;
    }

}