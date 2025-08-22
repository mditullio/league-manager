import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';
import LeagueSchema from '../../../../libs/db/league.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'League', schema: LeagueSchema.schema }]),
  ],
  providers: [LeagueService],
  controllers: [LeagueController],
})
export class LeagueModule {}
