
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MatchDto } from '../dtos/match.dto';
import { Match } from '../models/match.schema';

@Injectable()
export class MatchService {
    constructor(
        @InjectModel('Match') private readonly matchModel: Model<Match>,
    ) { }

    async create(dto: MatchDto): Promise<MatchDto> {
        const created = await this.matchModel.create({
            homeTeam: dto.homeTeam.id,
            awayTeam: dto.awayTeam.id,
            homeScore: dto.homeScore,
            awayScore: dto.awayScore,
            status: dto.status,
            date: dto.date,
            roundNumber: dto.roundNumber,
            groupName: dto.groupName,
            stage: dto.stage?.id,
            season: dto.season?.id,
            league: dto.league?.id,
        });

        const populated = await this.matchModel.findById(created._id)
            .populate('homeTeam')
            .populate('awayTeam')
            .populate('stage')
            .populate('season')
            .populate('league')
            .exec();

        return this.toDto(populated);
    }

    async findById(id: string): Promise<MatchDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Match not found');
        const match = await this.matchModel.findById(id)
            .populate('homeTeam')
            .populate('awayTeam')
            .populate('stage')
            .populate('season')
            .populate('league')
            .exec();
        if (!match) throw new NotFoundException('Match not found');
        return this.toDto(match);
    }

    async findAll(params: { teamId?: string; leagueId?: string; seasonId?: string; stageId?: string }): Promise<MatchDto[]> {
        const { teamId, leagueId, seasonId, stageId } = params;
        const query: any = {};

        if (teamId) query.$or = [{ homeTeam: teamId }, { awayTeam: teamId }];
        if (leagueId) query.league = leagueId;
        if (seasonId) query.season = seasonId;
        if (stageId) query.stage = stageId;
        const matches = await this.matchModel.find(query)
            .populate('homeTeam')
            .populate('awayTeam')
            .populate('stage')
            .populate('season')
            .populate('league')
            .exec();
        return matches.map(this.toDto);
    }

    async update(id: string, dto: MatchDto): Promise<MatchDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Match not found');
        const updateQuery: any = {
            homeTeam: dto.homeTeam.id,
            awayTeam: dto.awayTeam.id,
            homeScore: dto.homeScore,
            awayScore: dto.awayScore,
            status: dto.status,
            date: dto.date,
            roundNumber: dto.roundNumber,
            groupName: dto.groupName,
            stage: dto.stage?.id,
            season: dto.season?.id,
            league: dto.league?.id,
        };
        const updated = await this.matchModel.findByIdAndUpdate(id, updateQuery, { new: true })
            .populate('homeTeam')
            .populate('awayTeam')
            .populate('stage')
            .populate('season')
            .populate('league')
            .exec();
        if (!updated) throw new NotFoundException('Match not found');
        return this.toDto(updated);
    }

    async delete(id: string): Promise<MatchDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Match not found');
        const deleted = await this.matchModel.findByIdAndDelete(id)
            .populate('homeTeam')
            .populate('awayTeam')
            .populate('stage')
            .populate('season')
            .populate('league')
            .exec();
        if (!deleted) throw new NotFoundException('Match not found');
        return this.toDto(deleted);
    }

    private toDto(match: any): MatchDto {
        return {
            id: match._id?.toString(),
            homeTeam: { id: match.homeTeam._id?.toString(), name: match.homeTeam.name },
            awayTeam: { id: match.awayTeam._id?.toString(), name: match.awayTeam.name },
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            date: match.date ? new Date(match.date).toISOString() : undefined,
            roundNumber: match.roundNumber,
            status: match.status,
            groupName: match.groupName,
            stage: { id: match.stage?._id?.toString(), name: match.stage?.name },
            season: { id: match.season?._id?.toString(), name: match.season?.name },
            league: { id: match.league?._id?.toString(), name: match.league?.name },
        };
    }
}
