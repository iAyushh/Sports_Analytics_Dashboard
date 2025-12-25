import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async closedEventBets() {
  return this.prisma.$queryRaw`
    SELECT 
      u.username,
      e.sport,
      e.event_date,
      b.bet_amount
    FROM bets b
    JOIN "user" u ON u.user_id = b.user_id
    JOIN events e ON e.event_id = b.event_id
    WHERE e.status = 'closed'
  `;
}

async aggPerUser() {
  return this.prisma.$queryRaw`
    SELECT
      u.username,
      u.user_type,
      SUM(b.bet_amount) AS total_bet_amount,
      COUNT(CASE WHEN b.bet_outcome = 'win' THEN 1 END) AS total_wins
    FROM bets b
    JOIN "user" u ON u.user_id = b.user_id
    GROUP BY u.username, u.user_type
  `;
}

async sportAnalytics() {
  return this.prisma.$queryRaw`
    SELECT
      e.sport,
      COUNT(*) AS total_bets,
      SUM(b.bet_amount) AS total_bet_amount,
      ROUND(
        COUNT(CASE WHEN b.bet_outcome = 'win' THEN 1 END)::decimal 
        / COUNT(*) * 100, 2
      ) AS win_rate
    FROM bets b
    JOIN events e ON e.event_id = b.event_id
    GROUP BY e.sport
  `;
}

async dailyAnalytics() {
  return this.prisma.$queryRaw`
    SELECT
      DATE(b.bet_date) AS day,
      COUNT(*) AS total_bets,
      SUM(b.bet_amount) AS total_bet_amount,
      SUM(CASE WHEN b.bet_outcome = 'win' THEN b.bet_amount ELSE 0 END)
        AS total_winning_amount
    FROM bets b
    WHERE b.bet_date >= NOW() - INTERVAL '30 days'
    GROUP BY day
    ORDER BY day
  `;
}

async cricketBetters() {
  return this.prisma.$queryRaw`
    SELECT
      u.username,
      SUM(b.bet_amount) AS total_cricket_bet,
      COUNT(CASE WHEN b.bet_outcome = 'win' THEN 1 END) AS total_cricket_wins
    FROM bets b
    JOIN events e ON e.event_id = b.event_id
    JOIN "user" u ON u.user_id = b.user_id
    WHERE e.sport = 'cricket'
    GROUP BY u.username
    HAVING COUNT(DISTINCT e.sport) = 1
  `;
}

async topBetters() {
  return this.prisma.$queryRaw`
    SELECT
      RANK() OVER (ORDER BY SUM(b.bet_amount) DESC) AS rank,
      u.username,
      u.user_type,
      SUM(b.bet_amount) AS total_bet_amount
    FROM bets b
    JOIN "user" u ON u.user_id = b.user_id
    GROUP BY u.username, u.user_type
    ORDER BY total_bet_amount DESC
    LIMIT 10
  `;
}

async eventProfitLoss() {
  return this.prisma.$queryRaw`
    SELECT
      e.event_id,
      e.sport,
      SUM(b.bet_amount) AS total_bet_amount,
      SUM(CASE WHEN b.bet_outcome = 'win' THEN b.bet_amount ELSE 0 END)
        AS total_winning_amount,
      SUM(b.bet_amount) -
      SUM(CASE WHEN b.bet_outcome = 'win' THEN b.bet_amount ELSE 0 END)
        AS profit_loss
    FROM bets b
    JOIN events e ON e.event_id = b.event_id
    GROUP BY e.event_id, e.sport
  `;
}

async runningTotals() {
  return this.prisma.$queryRaw`
    SELECT
      u.username,
      b.bet_date,
      b.bet_amount,
      SUM(b.bet_amount) OVER (
        PARTITION BY u.user_id
        ORDER BY b.bet_date
      ) AS running_total
    FROM bets b
    JOIN "user" u ON u.user_id = b.user_id
    WHERE u.user_id IN (
      SELECT user_id FROM bets
      GROUP BY user_id
      HAVING COUNT(*) >= 5
    )
  `;
}

async highRiskUsers() {
  return this.prisma.$queryRaw`
    SELECT
      u.username,
      COUNT(*) AS total_bets,
      ROUND(
        COUNT(CASE WHEN b.bet_outcome = 'win' THEN 1 END)::decimal
        / COUNT(*) * 100, 2
      ) AS win_rate,
      SUM(b.bet_amount) AS total_bet_amount,
      COUNT(DISTINCT e.sport) AS sports_played
    FROM bets b
    JOIN "user" u ON u.user_id = b.user_id
    JOIN events e ON e.event_id = b.event_id
    GROUP BY u.username
    HAVING
      COUNT(*) > 50 AND
      COUNT(CASE WHEN b.bet_outcome = 'win' THEN 1 END)::decimal / COUNT(*) < 0.2 AND
      SUM(b.bet_amount) > 10000 AND
      COUNT(DISTINCT e.sport) >= 3
  `;
}




  
}
