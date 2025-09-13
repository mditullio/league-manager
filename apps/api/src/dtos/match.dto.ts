import { ApiProperty } from '@nestjs/swagger';
import { TeamRefDto } from './team-ref.dto';
import { StageRefDto } from './stage-ref.dto';
import { SeasonRefDto } from './season-ref.dto';
import { League } from 'src/models/league.schema';
import { LeagueRefDto } from './league-ref.dto';

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
    date?: string;

    @ApiProperty({ example: 'Group A', required: false })
    groupName?: string;

    @ApiProperty({ example: 1, required: false })
    roundNumber?: number;

    @ApiProperty({ example: 'Quarterfinals', required: false })
    roundName?: string;

    @ApiProperty({ example: 'Completed', required: false })
    status?: string;

    @ApiProperty({ type: StageRefDto })
    stage!: StageRefDto;

    @ApiProperty({ type: SeasonRefDto })
    season!: SeasonRefDto;

    @ApiProperty({ type: LeagueRefDto })
    league!: LeagueRefDto;
}
