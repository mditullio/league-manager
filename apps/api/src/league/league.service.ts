import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { League } from '../../../../libs/db/league.schema';
import { LeagueDto } from './dto/league.dto';

@Injectable()
export class LeagueService {
	constructor(@InjectModel('League') private leagueModel: Model<League>) {}

	async create(dto: LeagueDto): Promise<LeagueDto> {
		// Accept nation as {id, name} or just id
		const nationId = dto.nation && typeof dto.nation === 'object' ? dto.nation.id : dto.nation;
		const created = await this.leagueModel.create({ ...dto, nation: nationId ? new Types.ObjectId(nationId) : undefined });
		// Populate nation for response
		const populated = await this.leagueModel.findById(created._id).populate('nation').exec();
		if (!populated) throw new NotFoundException('League not found after creation');
		return this.toDto(populated);
	}

	async findAll(nation?: string, name?: string): Promise<LeagueDto[]> {
		const filter: any = {};
		if (nation) filter.nation = nation;
		if (name) filter.name = { $regex: `^${name}`, $options: 'i' };
		const leagues = await this.leagueModel.find(filter).populate('nation').exec();
		return leagues.map(this.toDto);
	}

	async findOne(id: string): Promise<LeagueDto> {
		if (!Types.ObjectId.isValid(id)) throw new NotFoundException('League not found');
		const league = await this.leagueModel.findById(id).populate('nation').exec();
		if (!league) throw new NotFoundException('League not found');
		return this.toDto(league);
	}

	async update(id: string, dto: LeagueDto): Promise<LeagueDto> {
		if (!Types.ObjectId.isValid(id)) throw new NotFoundException('League not found');
		const nationId = dto.nation && typeof dto.nation === 'object' ? dto.nation.id : dto.nation;
		const updateQuery: Partial<League> = {
			name: dto.name,
			nation: nationId ? new Types.ObjectId(nationId) : undefined,
			logoUrl: dto.logoUrl,
			description: dto.description,
		};
		const updated = await this.leagueModel.findByIdAndUpdate(id, updateQuery, { new: true }).populate('nation').exec();
		if (!updated) throw new NotFoundException('League not found');
		return this.toDto(updated);
	}

	async remove(id: string): Promise<LeagueDto> {
		if (!Types.ObjectId.isValid(id)) throw new NotFoundException('League not found');
		const deleted = await this.leagueModel.findByIdAndDelete(id).populate('nation').exec();
		if (!deleted) throw new NotFoundException('League not found');
		return this.toDto(deleted);
	}

	private toDto = (league: League): LeagueDto => {
		const { _id, name, nation, logoUrl, description } = league;
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
			nation: nationObj,
			logoUrl,
			description,
		};
	};
}
