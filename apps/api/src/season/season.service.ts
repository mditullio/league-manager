import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Season } from '../../../../libs/db/season.schema';
import { CreateSeasonDto, UpdateSeasonDto, SeasonDto } from './season.dto';

@Injectable()
export class SeasonService {
  constructor(
    @InjectModel('Season') private readonly seasonModel: Model<Season>,
  ) {}

  async create(leagueId: string, dto: CreateSeasonDto): Promise<SeasonDto> {
    const created = await this.seasonModel.create({ ...dto, league: leagueId ? new Types.ObjectId(leagueId) : undefined, rules: dto.rules ? new Types.ObjectId(dto.rules) : undefined, teams: dto.teams?.map(id => new Types.ObjectId(id)) });
    return SeasonDto.toDto(created);
  }

  async findAllByLeague(leagueId: string): Promise<SeasonDto[]> {
    const filter: any = {};
    if (leagueId) filter.league = leagueId;
    const seasons = await this.seasonModel.find(filter).exec();
    return seasons.map(SeasonDto.toDto);
  }

  async findById(id: string): Promise<SeasonDto> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Season not found');
    const season = await this.seasonModel.findById(id).exec();
    if (!season) throw new NotFoundException('Season not found');
    return SeasonDto.toDto(season);
  }

  async update(id: string, dto: UpdateSeasonDto): Promise<SeasonDto> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Season not found');
    const updateQuery: any = { ...dto };
    if (dto.league) updateQuery.league = new Types.ObjectId(dto.league);
    if (dto.rules) updateQuery.rules = new Types.ObjectId(dto.rules);
    if (dto.teams) updateQuery.teams = dto.teams.map(id => new Types.ObjectId(id));
    const updated = await this.seasonModel.findByIdAndUpdate(id, updateQuery, { new: true }).exec();
    if (!updated) throw new NotFoundException('Season not found');
    return SeasonDto.toDto(updated);
  }

  async delete(id: string): Promise<SeasonDto> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Season not found');
    const deleted = await this.seasonModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Season not found');
    return SeasonDto.toDto(deleted);
  }
}
