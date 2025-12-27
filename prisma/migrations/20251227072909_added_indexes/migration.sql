-- CreateIndex
CREATE INDEX "bets_user_id_idx" ON "bets"("user_id");

-- CreateIndex
CREATE INDEX "bets_event_id_idx" ON "bets"("event_id");

-- CreateIndex
CREATE INDEX "bets_bet_date_idx" ON "bets"("bet_date");

-- CreateIndex
CREATE INDEX "bets_user_id_bet_date_idx" ON "bets"("user_id", "bet_date");

-- CreateIndex
CREATE INDEX "events_status_idx" ON "events"("status");

-- CreateIndex
CREATE INDEX "events_sport_idx" ON "events"("sport");

-- CreateIndex
CREATE INDEX "events_event_date_idx" ON "events"("event_date");

-- CreateIndex
CREATE INDEX "user_user_type_idx" ON "user"("user_type");
