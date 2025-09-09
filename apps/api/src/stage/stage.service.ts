import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateQuery } from 'mongoose';
import { StageType, Stage, GroupStage, KnockoutStage, TeamGroup, StageRound, GroupStageRules, KnockoutStageRules } from '../../../../libs/db/stage.schema';
import { StageDto, GroupStageRulesDto, KnockoutStageRulesDto, TeamGroupDto, StageRoundDto } from './dto/stage.dto';
import { TeamRefDto } from './dto/team-ref.dto';

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
        let created: KnockoutStage | GroupStage;

        if (dto.type === StageType.Group) {
            created = await this.groupStageModel.create({
                season: dto.season?.id,
                order: dto.order,
                name: dto.name,
                type: dto.type,
                startDate: dto.startDate,
                endDate: dto.endDate,
                rounds: dto.rounds,
                groups: dto.groups?.map(g => ({ name: g.name, teams: g.teams?.map(t => t.id) })),
                rules: dto.groupRules,
            });
        } 
        else if (dto.type === StageType.Knockout) {
            created = await this.knockoutStageModel.create({
                season: dto.season?.id,
                order: dto.order,
                name: dto.name,
                type: dto.type,
                startDate: dto.startDate,
                endDate: dto.endDate,
                teams: dto.teams?.map(t => t.id),
                rules: dto.knockoutRules,
            });
        }
        else {
            throw new NotFoundException('Unknown stage type');
        }

        created = await this.stageModel
            .findById(created._id)
            .populate('season')
            .populate({ path: 'teams', select: 'name' })
            .populate({ path: 'groups.teams', select: 'name' })
            .exec() as unknown as KnockoutStage | GroupStage;

        if (!created) {
            throw new NotFoundException('Stage not created');
        }

        return this.toDto(created);
    }

    async findById(id: string): Promise<StageDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Stage not found');
        const stage = await this.stageModel
            .findById(id)
            .populate('season')
            .populate({ path: 'teams', select: 'name' })
            .populate({ path: 'groups.teams', select: 'name' })
            .exec();

        if (!stage) {
            throw new NotFoundException('Stage not found');
        }

        return this.toDto(stage as any);
    }

    async findAllBySeason(season: string): Promise<StageDto[]> {
        const stages = await this.stageModel
            .find({ season: season })
            .populate('season')
            .populate({ path: 'teams', select: 'name' })
            .populate({ path: 'groups.teams', select: 'name' })
            .exec();

        return (stages as any[]).map(this.toDto);
    }

    async update(id: string, dto: StageDto): Promise<StageDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Stage not found');
        if (dto.type === StageType.Group) {
            const updateQuery: UpdateQuery<GroupStage> = {
                season: dto.season?.id,
                order: dto.order,
                name: dto.name,
                type: dto.type,
                startDate: dto.startDate,
                endDate: dto.endDate,
                rounds: dto.rounds,
                groups: dto.groups?.map(g => ({ name: g.name, teams: g.teams?.map(t => t.id) })),
                rules: dto.groupRules,
            }
            const updated = await this.groupStageModel.findByIdAndUpdate(id, updateQuery, { new: true })
                .populate('season')
                .populate({ path: 'groups.teams', select: 'name' })
                .exec();
            if (!updated) throw new NotFoundException('Stage not found');
            return this.toDto(updated);
        } else if (dto.type === StageType.Knockout) {
            const updateQuery: UpdateQuery<KnockoutStage> = {
                season: dto.season?.id as any,
                order: dto.order,
                name: dto.name,
                type: dto.type,
                startDate: dto.startDate,
                endDate: dto.endDate,
                rounds: dto.rounds,
                teams: dto.teams?.map(t => t.id),
                rules: dto.knockoutRules,
            }
            const updated = await this.knockoutStageModel.findByIdAndUpdate(id, updateQuery, { new: true })
                .populate('season')
                .populate({ path: 'teams', select: 'name' })
                .exec();

            if (!updated) throw new NotFoundException('Stage not found');
            return this.toDto(updated);
        }
        else throw new NotFoundException('Unknown stage type');
    }

    async delete(id: string): Promise<StageDto> {
        if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Stage not found');
        const deleted = await this.stageModel.findByIdAndDelete(id).populate('season').exec() as unknown as KnockoutStage | GroupStage;
        if (!deleted) throw new NotFoundException('Stage not found');
        return this.toDto(deleted);
    }

    private toDto(stage: KnockoutStage | GroupStage): StageDto {
        const { _id, season, order, name, type, startDate, endDate, rounds } = stage;

        const dto: StageDto = {
            id: _id?.toString(),
            season: season && typeof season === 'object' && season._id ? { id: season._id.toString(), name: (season as any).name } : undefined,
            order,
            name,
            type,
            startDate: startDate ? new Date(startDate).toISOString() : undefined,
            endDate: endDate ? new Date(endDate).toISOString() : undefined,
        };
        if (rounds) {
            dto.rounds = rounds.map((r: any) => ({
                roundNumber: r.roundNumber,
                name: r.name,
                startDate: r.startDate ? new Date(r.startDate).toISOString() : undefined,
                endDate: r.endDate ? new Date(r.endDate).toISOString() : undefined,
            }));
        }
        if (type === StageType.Group) {
            const { groups, rules } = stage as GroupStage;
            dto.groups = (groups || []).map((group: TeamGroup) => {
                const tg: TeamGroupDto = {
                    name: group.name,
                    teams: (group.teams || []).map((team: any) => ({
                        id: team._id?.toString(),
                        name: team.name,
                    }))
                };
                return tg;
            });
            dto.groupRules = rules as GroupStageRulesDto;
        } else if (type === StageType.Knockout) {
            const { teams, rules } = stage as KnockoutStage;
            dto.teams = (teams || []).map((team: any) => ({
                id: team._id?.toString(),
                name: team.name,
            }));
            dto.knockoutRules = rules as KnockoutStageRulesDto;
        }
        return dto;
    }
}
