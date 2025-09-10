import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NationService } from '../services/nation.service';
import { NationController } from '../controllers/nation.controller';
import NationSchema from '../models/nation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Nation', schema: NationSchema.schema }]),
  ],
  providers: [NationService],
  controllers: [NationController],
})
export class NationModule {}
