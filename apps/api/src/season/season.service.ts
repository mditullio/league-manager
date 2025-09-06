import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Season } from '../../../../libs/db/season.schema';
import { SeasonDto } from './dto/season.dto';

@Injectable()
export class SeasonService {
    constructor(
        @InjectModel('Season') private readonly seasonModel: Model<Season>,
    ) { }

    async create(leagueId: string, dto: SeasonDto): Promise<SeasonDto> {
        const created = await this.seasonModel.create(this.fromDto({ ...dto, league: leagueId }));
        return this.toDto(created);
    }

    async findAllByLeague(leagueId: string): Promise<SeasonDto[]> {
        const filter: any = {};
        if (leagueId) filter.league = leagueId;
        const seasons = await this.seasonModel.find(filter).exec();
        return seasons.map(this.toDto);
    }

    async findById(id: string): Promise<SeasonDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Season not found');
        const season = await this.seasonModel.findById(id).exec();
        if (!season) throw new NotFoundException('Season not found');
        return this.toDto(season);
    }

    async update(id: string, dto: SeasonDto): Promise<SeasonDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Season not found');
        const updateQuery: any = { ...dto };
        if (dto.league) updateQuery.league = new Types.ObjectId(dto.league);
        if (dto.rules) updateQuery.rules = new Types.ObjectId(dto.rules);
        if (dto.teams) updateQuery.teams = dto.teams.map(id => new Types.ObjectId(id));
        const updated = await this.seasonModel.findByIdAndUpdate(id, updateQuery, { new: true }).exec();
        if (!updated) throw new NotFoundException('Season not found');
        return this.toDto(updated);
    }

    async delete(id: string): Promise<SeasonDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Season not found');
        const deleted = await this.seasonModel.findByIdAndDelete(id).exec();
        if (!deleted) throw new NotFoundException('Season not found');
        return this.toDto(deleted);
    }

    private fromDto = (dto: SeasonDto): Partial<Season> => {
        const season: Partial<Season> = {
            name: dto.name,
            startDate: dto.startDate ? new Date(dto.startDate) : undefined,
            endDate: dto.endDate ? new Date(dto.endDate) : undefined,
            league: dto.league ? new Types.ObjectId(dto.league) : undefined,
            rules: dto.rules ? new Types.ObjectId(dto.rules) : undefined,
            teams: dto.teams ? dto.teams.map(id => new Types.ObjectId(id)) : undefined,
        };
        return season;
    }

    private toDto = (season: Season): SeasonDto => {
        const { _id, name, startDate, endDate, league, rules, teams } = season;
        return {
            id: _id?.toString(),
            name,
            startDate: startDate ? startDate.toISOString() : undefined,
            endDate: endDate ? endDate.toISOString() : undefined,
            league: league ? league.toString() : undefined,
            rules: rules ? rules.toString() : undefined,
            teams: teams ? teams.map(id => id.toString()) : undefined,
        };
    };

}
