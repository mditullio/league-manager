import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StageController } from './stage.controller';
import { StageService } from './stage.service';
import { GroupStageModel, KnockoutStageModel, Stage, StageModel } from '../../../../libs/db/stage.schema';

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
