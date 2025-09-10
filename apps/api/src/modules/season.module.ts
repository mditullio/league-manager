import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeasonController } from '../controllers/season.controller';
import { SeasonService } from '../services/season.service';
import SeasonModel from '../models/season.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Season', schema: SeasonModel.schema }]),
  ],
  controllers: [SeasonController],
  providers: [SeasonService],
  exports: [SeasonService],
})
export class SeasonModule {}
