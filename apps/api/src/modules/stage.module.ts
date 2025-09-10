import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StageController } from '../controllers/stage.controller';
import { StageService } from '../services/stage.service';
import { GroupStageModel, KnockoutStageModel, Stage, StageModel } from '../models/stage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Stage', schema: StageModel.schema, discriminators: [
      { name: 'group', schema: GroupStageModel.schema },
      { name: 'knockout', schema: KnockoutStageModel.schema },
    ] }]),
  ],
  controllers: [StageController],
  providers: [StageService],
  exports: [StageService],
})
export class StageModule {}
