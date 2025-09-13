import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { MatchService } from '../services/match.service';
import { MatchDto } from '../dtos/match.dto';
import { ApiTags, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Matches')
@Controller('matches')
export class MatchController {
    constructor(private readonly matchService: MatchService) { }

    @Post()
    @ApiResponse({ status: 201, type: MatchDto })
    async create(@Body() dto: MatchDto): Promise<MatchDto> {
        return this.matchService.create(dto);
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, type: MatchDto })
    async findById(@Param('id') id: string): Promise<MatchDto> {
        return this.matchService.findById(id);
    }

    @Get()
    @ApiQuery({ name: 'teamId', required: false })
    @ApiQuery({ name: 'leagueId', required: false })
    @ApiQuery({ name: 'seasonId', required: false })
    @ApiQuery({ name: 'stageId', required: false })
    @ApiResponse({ status: 200, type: [MatchDto] })
    async findAll(
        @Query('teamId') teamId?: string,
        @Query('leagueId') leagueId?: string,
        @Query('seasonId') seasonId?: string,
        @Query('stageId') stageId?: string,
    ): Promise<MatchDto[]> {
        return this.matchService.findAll({ teamId, leagueId, seasonId, stageId });
    }

    @Patch(':id')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, type: MatchDto })
    async update(@Param('id') id: string, @Body() dto: MatchDto): Promise<MatchDto> {
        return this.matchService.update(id, dto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, type: MatchDto })
    async delete(@Param('id') id: string): Promise<MatchDto> {
        return this.matchService.delete(id);
    }
}
