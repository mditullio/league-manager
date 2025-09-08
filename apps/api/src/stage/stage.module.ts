import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StageController } from './stage.controller';
import { StageService } from './stage.service';
import { Stage, StageModel } from '../../../../libs/db/stage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Stage', schema: StageModel.schema }]),
  ],
  controllers: [StageController],
  providers: [StageService],
  exports: [StageService],
})
export class StageModule {}
