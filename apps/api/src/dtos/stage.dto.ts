import { ApiProperty } from '@nestjs/swagger';
import { TeamRefDto } from './team-ref.dto';

export class TeamGroupDto {
    @ApiProperty({ example: 'Group A' })
    name!: string;

    @ApiProperty({ type: [TeamRefDto] })
    teams!: TeamRefDto[];
}

export class StageRoundDto {
    @ApiProperty({ example: 1 })
    roundNumber!: number;

    @ApiProperty({ example: 'Quarterfinals', required: false })
    name?: string;

    @ApiProperty({ type: String, format: 'date-time', required: false })
    startDate?: string;

    @ApiProperty({ type: String, format: 'date-time', required: false })
    endDate?: string;
}

export enum StageType {
    Group = 'group',
    Knockout = 'knockout',
}

export class GroupStageRulesDto {
    @ApiProperty({ example: 3 })
    pointsForWin!: number;

    @ApiProperty({ example: 1 })
    pointsForDraw!: number;

    @ApiProperty({ example: 0 })
    pointsForLoss!: number;

    @ApiProperty({ example: ['goalDifference', 'goalsFor', 'headToHead'], isArray: true })
    tieBreakerOrder!: string[];

    @ApiProperty({ example: 20, required: false })
    maxTeams?: number;

    @ApiProperty({ type: Object, required: false })
    otherRules?: Record<string, any>;
}

export class KnockoutStageRulesDto {
    @ApiProperty({ example: false })
    twoLeggedTies!: boolean;

    @ApiProperty({ example: false })
    awayGoalsRule!: boolean;

    @ApiProperty({ example: false })
    extraTime!: boolean;

    @ApiProperty({ example: false })
    penalties!: boolean;

    @ApiProperty({ type: Object, required: false })
    otherRules?: Record<string, any>;
}

export class StageDto {
    @ApiProperty({ example: '64e4b8f2c2a4b2e4d8e4b8f2', description: 'MongoDB ObjectId', required: false })
    id?: string;

    @ApiProperty({ example: { id: '64e4b8f2c2a4b2e4d8e4b8f2', name: '2024/2025' }, description: 'Season object with id and name', required: true })
    season?: { id: string; name: string };

    @ApiProperty({ example: 1 })
    order!: number;

    @ApiProperty({ example: 'Group Stage' })
    name!: string;

    @ApiProperty({ enum: StageType })
    type!: StageType;

    @ApiProperty({ type: String, format: 'date-time', required: false })
    startDate?: string;

    @ApiProperty({ type: String, format: 'date-time', required: false })
    endDate?: string;

    @ApiProperty({ type: [StageRoundDto], required: false })
    rounds?: StageRoundDto[];

    // Group stage specific
    @ApiProperty({ type: [TeamGroupDto], required: false })
    groups?: TeamGroupDto[];

    @ApiProperty({ type: GroupStageRulesDto, required: false })
    groupRules?: GroupStageRulesDto;

    // Knockout stage specific
    @ApiProperty({ type: [TeamRefDto], required: false })
    teams?: TeamRefDto[];

    @ApiProperty({ type: KnockoutStageRulesDto, required: false })
    knockoutRules?: KnockoutStageRulesDto;
}
