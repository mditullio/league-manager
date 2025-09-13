import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchController } from '../controllers/match.controller';
import { MatchService } from '../services/match.service';
import { MatchModel } from '../models/match.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Match', schema: MatchModel.schema }]),
  ],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}
