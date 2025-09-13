import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeagueService } from '../services/league.service';
import { LeagueController } from '../controllers/league.controller';
import { LeagueModel } from '../models/league.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'League', schema: LeagueModel.schema }]),
    ],
    providers: [LeagueService],
    controllers: [LeagueController],
})
export class LeagueModule { }
