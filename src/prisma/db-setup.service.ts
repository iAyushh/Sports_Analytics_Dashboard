import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class DbSetupService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.createIndexes();
  }

  async createIndexes() {
    await this.prisma.$queryRaw`
        CREATE INDEX IF NOT EXISTS idx_bets_user_id 
        ON bets(user_id)`;

    await this.prisma.$queryRaw`
        CREATE INDEX IF NOT EXISTS idx_bets_event_id
        ON bets(event_id)`;

    await this.prisma.$queryRaw`
        CREATE INDEX IF NOT EXISTS idx_bets_bet_date
        ON bets(bet_date)`;
    await this.prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS idx_bets_user_date
      ON bets(user_id, bet_date);
    `;

    await this.prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS idx_events_status
      ON events(status);
    `;

    await this.prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS idx_events_sport
      ON events(sport);
    `;
  }
}
