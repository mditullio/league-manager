import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Season } from '../models/season.schema';
import { SeasonDto } from '../dtos/season.dto';

@Injectable()
export class SeasonService {
    constructor(
        @InjectModel('Season') private readonly seasonModel: Model<Season>,
    ) { }

    async create(leagueId: string, dto: SeasonDto): Promise<SeasonDto> {
        const created = await this.seasonModel.create(this.fromDto({ ...dto, league: { id: leagueId }}));
        const populated = await this.seasonModel.findById(created._id).populate('league').exec();
        if (!populated) throw new NotFoundException('Season not found after creation');
        return this.toDto(populated);
    }

    async findAllByLeague(leagueId: string): Promise<SeasonDto[]> {
        const filter: any = {};
        if (leagueId) filter.league = leagueId;
        const seasons = await this.seasonModel.find(filter).populate('league').exec();
        return seasons.map(this.toDto);
    }

    async findById(id: string): Promise<SeasonDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Season not found');
        const season = await this.seasonModel.findById(id).populate('league').exec();
        if (!season) throw new NotFoundException('Season not found');
        return this.toDto(season);
    }

    async update(id: string, dto: SeasonDto): Promise<SeasonDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Season not found');
        const updateQuery: any = { ...dto };
        if (dto.league) updateQuery.league = typeof dto.league === 'object' ? dto.league.id : dto.league;
        const updated = await this.seasonModel.findByIdAndUpdate(id, updateQuery, { new: true }).populate('league').exec();
        if (!updated) throw new NotFoundException('Season not found');
        return this.toDto(updated);
    }

    async delete(id: string): Promise<SeasonDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Season not found');
        const deleted = await this.seasonModel.findByIdAndDelete(id).populate('league').exec();
        if (!deleted) throw new NotFoundException('Season not found');
        return this.toDto(deleted);
    }

    private fromDto = (dto: SeasonDto): Partial<Season> => {
        const season: Partial<Season> = {
            name: dto.name,
            startDate: dto.startDate ? new Date(dto.startDate) : undefined,
            endDate: dto.endDate ? new Date(dto.endDate) : undefined,
            league: dto.league ? new Types.ObjectId(dto.league.id) : undefined,
        };
        return season;
    }

    private toDto = (season: Season): SeasonDto => {
        const { _id, name, startDate, endDate, league } = season;
        let leagueObj: { id: string; name: string } | undefined = undefined;
        if (league && typeof league === 'object' && 'name' in league && '_id' in league) {
            leagueObj = { id: league._id.toString(), name: (league as any).name };
        } else if (league && typeof league === 'object' && '_id' in league) {
            leagueObj = { id: league._id.toString(), name: '' };
        } else if (league && typeof league === 'string') {
            leagueObj = { id: league, name: '' };
        }
        return {
            id: _id?.toString(),
            league: leagueObj,
            name,
            startDate: startDate ? startDate.toISOString().substring(0, 10) : undefined,
            endDate: endDate ? endDate.toISOString().substring(0, 10) : undefined,
        };
    };

}
