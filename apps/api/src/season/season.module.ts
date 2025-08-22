import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeasonController } from './season.controller';
import { SeasonService } from './season.service';
import SeasonModel from '../../../../libs/db/season.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Season', schema: SeasonModel.schema }]),
  ],
  controllers: [SeasonController],
  providers: [SeasonService],
  exports: [SeasonService],
})
export class SeasonModule {}
