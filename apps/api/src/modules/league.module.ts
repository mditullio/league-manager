import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeagueService } from '../services/league.service';
import { LeagueController } from '../controllers/league.controller';
import LeagueSchema from '../models/league.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'League', schema: LeagueSchema.schema }]),
  ],
  providers: [LeagueService],
  controllers: [LeagueController],
})
export class LeagueModule {}
