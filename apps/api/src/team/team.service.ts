import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Team } from '../../../../libs/db/team.schema';
import { TeamDto } from './dto/team.dto';

@Injectable()
export class TeamService {
    constructor(@InjectModel('Team') private teamModel: Model<Team>) { }

    async create(dto: TeamDto): Promise<TeamDto> {
        const created = await this.teamModel.create({ ...dto, nation: dto.nation ? new Types.ObjectId(dto.nation) : undefined });
        return this.toDto(created);
    }

    async findAll(nation?: string, name?: string): Promise<TeamDto[]> {
        const filter: any = {};
        if (nation) filter.nation = nation;
        if (name) filter.name = { $regex: `^${name}`, $options: 'i' };
        const teams = await this.teamModel.find(filter).exec();
        return teams.map(this.toDto);
    }

    async findOne(id: string): Promise<TeamDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Team not found');
        const team = await this.teamModel.findById(id).exec();
        if (!team) throw new NotFoundException('Team not found');
        return this.toDto(team);
    }

    async update(id: string, dto: TeamDto): Promise<TeamDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Team not found');
        const updateQuery: Partial<Team> = {
            name: dto.name,
            shortName: dto.shortName,
            logoUrl: dto.logoUrl,
            nation: dto.nation ? new Types.ObjectId(dto.nation) : undefined,
            founded: dto.founded,
            city: dto.city,
            stadium: dto.stadium,
            colors: dto.colors,
        };
        const updated = await this.teamModel.findByIdAndUpdate(id, updateQuery, { new: true }).exec();
        if (!updated) throw new NotFoundException('Team not found');
        return this.toDto(updated);
    }

    async remove(id: string): Promise<TeamDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Team not found');
        const deleted = await this.teamModel.findByIdAndDelete(id).exec();
        if (!deleted) throw new NotFoundException('Team not found');
        return this.toDto(deleted);
    }

    private toDto = (team: Team): TeamDto => {
        const { _id, name, shortName, logoUrl, nation, founded, city, stadium, colors } = team;
        return {
            id: _id?.toString(),
            name,
            shortName,
            logoUrl,
            nation: nation ? nation.toString() : undefined,
            founded,
            city,
            stadium,
            colors,
        };
    };
}
