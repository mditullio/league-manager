import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { League } from '../../../../libs/db/league.schema';
import { LeagueDto } from './dto/league.dto';

@Injectable()
export class LeagueService {
	constructor(@InjectModel('League') private leagueModel: Model<League>) {}

	async create(dto: LeagueDto): Promise<LeagueDto> {
		const created = await this.leagueModel.create({ ...dto, nation: dto.nation ? new Types.ObjectId(dto.nation) : undefined });
		return this.toDto(created);
	}

	async findAll(nation?: string, name?: string): Promise<LeagueDto[]> {
		const filter: any = {};
		if (nation) filter.nation = nation;
		if (name) filter.name = { $regex: `^${name}`, $options: 'i' };
		const leagues = await this.leagueModel.find(filter).exec();
		return leagues.map(this.toDto);
	}

	async findOne(id: string): Promise<LeagueDto> {
		if (!Types.ObjectId.isValid(id)) throw new NotFoundException('League not found');
		const league = await this.leagueModel.findById(id).exec();
		if (!league) throw new NotFoundException('League not found');
		return this.toDto(league);
	}

	async update(id: string, dto: LeagueDto): Promise<LeagueDto> {
		if (!Types.ObjectId.isValid(id)) throw new NotFoundException('League not found');
		const updateQuery: Partial<League> = {
			name: dto.name,
			nation: dto.nation ? new Types.ObjectId(dto.nation) : undefined,
			logoUrl: dto.logoUrl,
			description: dto.description,
		};
		const updated = await this.leagueModel.findByIdAndUpdate(id, updateQuery, { new: true }).exec();
		if (!updated) throw new NotFoundException('League not found');
		return this.toDto(updated);
	}

	async remove(id: string): Promise<LeagueDto> {
		if (!Types.ObjectId.isValid(id)) throw new NotFoundException('League not found');
		const deleted = await this.leagueModel.findByIdAndDelete(id).exec();
		if (!deleted) throw new NotFoundException('League not found');
		return this.toDto(deleted);
	}

	private toDto = (league: League): LeagueDto => {
		const { _id, name, nation, logoUrl, description } = league;
		return {
			id: _id?.toString(),
			name,
			nation: nation ? nation.toString() : undefined,
			logoUrl,
			description,
		};
	};
}
