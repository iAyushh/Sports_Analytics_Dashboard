import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { DbSetupService } from "./db-setup.service";


@Module({
   providers:[PrismaService, DbSetupService],
   exports:[PrismaService]
}
)
export class PrismaModule{}