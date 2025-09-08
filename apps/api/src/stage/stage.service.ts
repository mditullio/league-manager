import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StageType, Stage, GroupStage, KnockoutStage } from '../../../../libs/db/stage.schema';
import { StageDto, GroupStageRulesDto, KnockoutStageRulesDto } from './dto/stage.dto';

@Injectable()
export class StageService {

    private groupStageModel: Model<GroupStage>;
    private knockoutStageModel: Model<KnockoutStage>;

    constructor(
        @InjectModel('Stage') private readonly stageModel: Model<Stage>,
    ) {
        if (!this.stageModel.discriminators) {
            throw new Error('Stage model does not have discriminators defined');
        }
        this.groupStageModel = this.stageModel.discriminators['group'] as Model<GroupStage>;
        this.knockoutStageModel = this.stageModel.discriminators['knockout'] as Model<KnockoutStage>;
    }

    async create(dto: StageDto): Promise<StageDto> {
        let created;
        if (dto.type === StageType.Group) {
            created = await this.groupStageModel.create({
                seasonId: dto.season?.id,
                order: dto.order,
                name: dto.name,
                type: dto.type,
                startDate: dto.startDate,
                endDate: dto.endDate,
                teamGroups: dto.teamGroups,
                rules: dto.groupRules,
            });
        } else if (dto.type === StageType.Knockout) {
            created = await this.knockoutStageModel.create({
                seasonId: dto.season?.id,
                order: dto.order,
                name: dto.name,
                type: dto.type,
                startDate: dto.startDate,
                endDate: dto.endDate,
                initialTeams: dto.initialTeams,
                rules: dto.knockoutRules,
            });
        } else {
            throw new NotFoundException('Unknown stage type');
        }
        return this.toDto(created);
    }

    async findById(id: string): Promise<StageDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Stage not found');
        const stage = await this.stageModel
            .findById(id)
            .populate('seasonId')
            .populate({
                path: 'initialTeams',
                select: 'name',
            })
            .exec();
        // For group stage, populate teams in each group
        if (stage?.type === StageType.Group && (stage as unknown as GroupStage).teamGroups) {
            const teamGroups = (stage as unknown as GroupStage).teamGroups;
            for (const groupName of Object.keys(teamGroups)) {
                (teamGroups as any)[groupName] = await this.stageModel.db.model('Team').find({ _id: { $in: teamGroups[groupName] } }, 'name').lean();
            }
        }
        if (!stage) throw new NotFoundException('Stage not found');
        return this.toDto(stage);
    }

    async findAllBySeason(seasonId: string): Promise<StageDto[]> {
        const stages = await this.stageModel
            .find({ seasonId })
            .populate('seasonId')
            .populate({ path: 'initialTeams', select: 'name' })
            .exec();
        for (const stage of stages) {
            if (stage.type === StageType.Group && (stage as unknown as GroupStage).teamGroups) {
            const teamGroups = (stage as unknown as GroupStage).teamGroups;
                for (const groupName of Object.keys(teamGroups)) {
                    (teamGroups as any)[groupName] = await this.stageModel.db.model('Team').find({ _id: { $in: teamGroups[groupName] } }, 'name').lean();
                }
            }
        }
        return stages.map(this.toDto);
    }

    async update(id: string, dto: StageDto): Promise<StageDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Stage not found');
        const updateQuery: any = {
            order: dto.order,
            name: dto.name,
            type: dto.type,
            startDate: dto.startDate,
            endDate: dto.endDate,
        };
        if (dto.type === StageType.Group) {
            updateQuery.teamGroups = dto.teamGroups;
            updateQuery.rules = dto.groupRules;
        } else if (dto.type === StageType.Knockout) {
            updateQuery.initialTeams = dto.initialTeams;
            updateQuery.rules = dto.knockoutRules;
        }
        const updated = await this.stageModel.findByIdAndUpdate(id, updateQuery, { new: true }).populate('seasonId').exec();
        if (!updated) throw new NotFoundException('Stage not found');
        return this.toDto(updated);
    }

    async delete(id: string): Promise<StageDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Stage not found');
        const deleted = await this.stageModel.findByIdAndDelete(id).populate('seasonId').exec();
        if (!deleted) throw new NotFoundException('Stage not found');
        return this.toDto(deleted);
    }

    private toDto(stage: any): StageDto {
        const { _id, seasonId, order, name, type, startDate, endDate, teamGroups, rules, initialTeams } = stage;
        const dto: StageDto = {
            id: _id?.toString(),
            season: seasonId && typeof seasonId === 'object' && seasonId._id ? { id: seasonId._id.toString(), name: seasonId.name } : undefined,
            order,
            name,
            type,
            startDate: startDate ? new Date(startDate).toISOString() : undefined,
            endDate: endDate ? new Date(endDate).toISOString() : undefined,
        };
        if (type === StageType.Group) {
            // Map teamGroups to {id, name}
            dto.teamGroups = {};
            for (const groupName of Object.keys(teamGroups || {})) {
                dto.teamGroups[groupName] = (teamGroups[groupName] || []).map((team: any) => ({ id: team._id?.toString(), name: team.name }));
            }
            dto.groupRules = rules as GroupStageRulesDto;
        } else if (type === StageType.Knockout) {
            dto.initialTeams = (initialTeams || []).map((team: any) => ({ id: team._id?.toString(), name: team.name }));
            dto.knockoutRules = rules as KnockoutStageRulesDto;
        }
        return dto;
    }
}
