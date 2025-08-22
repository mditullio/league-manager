import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { TeamDto } from './dto/team.dto';

@ApiTags('Teams')
@Controller('teams')
export class TeamController {
    constructor(private readonly teamService: TeamService) { }

    @Post()
    @ApiBody({ type: TeamDto })
    @ApiResponse({ status: 201, type: TeamDto })
    create(@Body() body: TeamDto) {
        return this.teamService.create(body);
    }

    @Get()
    @ApiResponse({ status: 200, type: [TeamDto] })
    @ApiQuery({ name: 'nation', required: false, description: 'Nation ObjectId to filter teams' })
    @ApiQuery({ name: 'name', required: false, description: 'Filter teams whose name starts with this value (case-insensitive)' })
    findAll(@Query('nation') nation?: string, @Query('name') name?: string) {
        return this.teamService.findAll(nation, name);
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, type: TeamDto })
    findOne(@Param('id') id: string) {
        return this.teamService.findOne(id);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: TeamDto })
    @ApiResponse({ status: 200, type: TeamDto })
    update(@Param('id') id: string, @Body() body: TeamDto) {
        return this.teamService.update(id, body);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Team deleted' })
    remove(@Param('id') id: string) {
        return this.teamService.remove(id);
    }
}
