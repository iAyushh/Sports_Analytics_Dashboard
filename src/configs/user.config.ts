import { registerAs } from "@nestjs/config";


export const userConfigFactory = registerAs('user',()=>({
    passwordSaltLength: 16 as const,
    passwordHashLength: 32 as const,
}))