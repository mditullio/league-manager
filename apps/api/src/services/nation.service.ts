import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Nation } from '../models/nation.schema';
import { NationDto } from '../dtos/nation.dto';

@Injectable()
export class NationService {
    constructor(@InjectModel('Nation') private nationModel: Model<Nation>) { }

    async create(dto: NationDto): Promise<NationDto> {
        const created = await this.nationModel.create({ ...dto });
        return this.toDto(created);
    }

    async findAll(name?: string): Promise<NationDto[]> {
        const filter: any = {};
        if (name) filter.name = { $regex: `^${name}`, $options: 'i' };
        const nations = await this.nationModel.find(filter).exec();
        return nations.map(this.toDto);
    }

    async findOne(id: string): Promise<NationDto | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException('Nation not found');
        }
        const nation = await this.nationModel.findById(id).exec();
        if (!nation) {
            throw new NotFoundException('Nation not found');
        }
        return this.toDto(nation);
    }

    async update(id: string, dto: NationDto): Promise<NationDto> {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException('Nation not found');
        }
        const updateQuery: Partial<Nation> = { name: dto.name, code: dto.code, flagUrl: dto.flagUrl, flagEmoji: dto.flagEmoji };
        const updated = await this.nationModel.findByIdAndUpdate(id, updateQuery, { new: true }).exec();
        if (!updated) {
            throw new NotFoundException('Nation not found');
        }
        return this.toDto(updated);
    }

    async remove(id: string): Promise<NationDto | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException('Nation not found');
        }
        const deleted = await this.nationModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new NotFoundException('Nation not found');
        }
        return this.toDto(deleted);
    }

    private toDto = (nation: Nation): NationDto => {
        const { _id, name, code, flagUrl, flagEmoji } = nation;
        return { id: _id?.toString(), name, code, flagUrl, flagEmoji };
    };
}
