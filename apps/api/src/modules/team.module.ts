import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamService } from '../services/team.service';
import { TeamController } from '../controllers/team.controller';
import TeamSchema from '../models/team.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema.schema }]),
  ],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
