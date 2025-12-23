import { Injectable } from '@nestjs/common';
import { EventService } from 'src/event/';
import { PrismaService } from 'src/prisma';
import { UserService } from 'src/user/';
import { CreateBetDto } from './dto/create-bet.dto';

@Injectable()
export class BetService {
    constructor(
        private userService:UserService,
        private readonly eventService:EventService,
        private readonly prisma:PrismaService
    ){}
   
    async getAllBets(){
        return await this.prisma.bets.findMany();
    }

    async getById(betId:number){
        return await this.prisma.bets.findUniqueOrThrow({
            where:{
                betId,
            }
        })
    }
   async getUserbyId(userId:number){
    return await this.userService.getById(userId);
   }
   async getEventbyId(eventId:number){
    return await this.eventService.findById(eventId);
   }

   async createBet(userId:number, data:CreateBetDto){
    const user = await this.getUserbyId(userId);
    const newBet= await this.prisma.bets.create({
        data:{
            userId:user.userId,
            eventId:data.eventId,
            betAmount:data.betAmount,
        }
        
    })
    return newBet;
   }

}
