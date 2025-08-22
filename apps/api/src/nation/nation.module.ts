import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NationService } from './nation.service';
import { NationController } from './nation.controller';
import NationSchema from '../../../../libs/db/nation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Nation', schema: NationSchema.schema }]),
  ],
  providers: [NationService],
  controllers: [NationController],
})
export class NationModule {}
