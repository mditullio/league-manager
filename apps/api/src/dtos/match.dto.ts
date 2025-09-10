import { ApiProperty } from '@nestjs/swagger';
import { TeamRefDto } from './team-ref.dto';

export class MatchDto {
  @ApiProperty({ example: '64e4b8f2c2a4b2e4d8e4b8f2', description: 'MongoDB ObjectId', required: false })
  id?: string;

  @ApiProperty({ type: TeamRefDto })
  homeTeam!: TeamRefDto;

  @ApiProperty({ type: TeamRefDto })
  awayTeam!: TeamRefDto;

  @ApiProperty({ example: 2 })
  homeScore?: number;

  @ApiProperty({ example: 1 })
  awayScore?: number;

  @ApiProperty({ type: String, format: 'date-time' })
  date!: string;

  @ApiProperty({ example: 'Group A', required: false })
  groupName?: string;

  @ApiProperty({ example: 1, required: false })
  roundNumber?: number;

  @ApiProperty({ example: 'Quarterfinals', required: false })
  roundName?: string;

  @ApiProperty({ example: 'Completed', required: false })
  status?: string;

  @ApiProperty({ example: '64e4b8f2c2a4b2e4d8e4b8f2', description: 'Stage ID', required: false })
  stageId?: string;

  @ApiProperty({ example: '64e4b8f2c2a4b2e4d8e4b8f2', description: 'Season ID', required: false })
  seasonId?: string;
}
