import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Team } from '../../../../libs/db/team.schema';
import { TeamDto } from './dto/team.dto';

@Injectable()
export class TeamService {
    constructor(@InjectModel('Team') private teamModel: Model<Team>) { }

    async create(dto: TeamDto): Promise<TeamDto> {
        // Accept nation as {id, name} or just id
        const nationId = dto.nation && typeof dto.nation === 'object' ? dto.nation.id : dto.nation;
        const created = await this.teamModel.create({ ...dto, nation: nationId ? new Types.ObjectId(nationId) : undefined });
        // Populate nation for response
        const populated = await this.teamModel.findById(created._id).populate('nation').exec();
    if (!populated) throw new NotFoundException('Team not found after creation');
    return this.toDto(populated);
    }

    async findAll(nation?: string, name?: string): Promise<TeamDto[]> {
        const filter: any = {};
        if (nation) filter.nation = nation;
        if (name) filter.name = { $regex: `^${name}`, $options: 'i' };
        const teams = await this.teamModel.find(filter).populate('nation').exec();
        return teams.map(this.toDto);
    }

    async findOne(id: string): Promise<TeamDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Team not found');
        const team = await this.teamModel.findById(id).populate('nation').exec();
        if (!team) throw new NotFoundException('Team not found');
        return this.toDto(team);
    }

    async update(id: string, dto: TeamDto): Promise<TeamDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Team not found');
        const nationId = dto.nation && typeof dto.nation === 'object' ? dto.nation.id : dto.nation;
        const updateQuery: Partial<Team> = {
            name: dto.name,
            shortName: dto.shortName,
            logoUrl: dto.logoUrl,
            nation: nationId ? new Types.ObjectId(nationId) : undefined,
            founded: dto.founded,
            city: dto.city,
            stadium: dto.stadium,
            colors: dto.colors,
        };
        const updated = await this.teamModel.findByIdAndUpdate(id, updateQuery, { new: true }).populate('nation').exec();
        if (!updated) throw new NotFoundException('Team not found');
        return this.toDto(updated);
    }

    async remove(id: string): Promise<TeamDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Team not found');
        const deleted = await this.teamModel.findByIdAndDelete(id).populate('nation').exec();
        if (!deleted) throw new NotFoundException('Team not found');
        return this.toDto(deleted);
    }

    private toDto = (team: Team): TeamDto => {
        const { _id, name, shortName, logoUrl, nation, founded, city, stadium, colors } = team;
        let nationObj: { id: string; name: string } | undefined = undefined;
        if (nation && typeof nation === 'object' && 'name' in nation && '_id' in nation) {
            nationObj = { id: nation._id.toString(), name: (nation as any).name };
        } else if (nation && typeof nation === 'object' && '_id' in nation) {
            nationObj = { id: nation._id.toString(), name: '' };
        } else if (nation && typeof nation === 'string') {
            nationObj = { id: nation, name: '' };
        }
        return {
            id: _id?.toString(),
            name,
            shortName,
            logoUrl,
            nation: nationObj,
            founded,
            city,
            stadium,
            colors,
        };
    };
}
