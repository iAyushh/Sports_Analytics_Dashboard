import { jwtConfigFactory, userConfigFactory } from "@Config";
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./strategies";
import { UtilsService } from "./providers";


@Global()
@Module({
    imports:[ConfigModule.forRoot({
        isGlobal:true,
        load:[jwtConfigFactory,userConfigFactory]
    })],
    providers:[JwtStrategy,UtilsService],
    exports:[JwtStrategy,UtilsService]
}) export class CommonModule{}