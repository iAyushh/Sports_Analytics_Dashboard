import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private service: AnalyticsService) {}

  @Get('closed-bets') closedBets() {
    return this.service.closedEventBets();
  }

  @Get('user-summary') userSummary() {
    return this.service.aggPerUser();
  }

  @Get('sport') sport() {
    return this.service.sportAnalytics();
  }

  @Get('daily') daily() {
    return this.service.dailyAnalytics();
  }

  @Get('cricket-only') cricketOnly() {
    return this.service.cricketBetters();
  }

  @Get('ranking') ranking() {
    return this.service.topBetters();
  }

  @Get('event-profit') eventProfit() {
    return this.service.eventProfitLoss();
  }

  @Get('running-total') runningTotal() {
    return this.service.runningTotals();
  }

  @Get('high-risk') highRisk() {
    return this.service.highRiskUsers();
  }
}
