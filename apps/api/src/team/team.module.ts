import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import TeamSchema from '../../../../libs/db/team.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema.schema }]),
  ],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
