import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { SeasonService } from '../services/season.service';
import { SeasonDto } from '../dtos/season.dto';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Seasons')
@Controller()
export class SeasonController {
    constructor(private readonly seasonService: SeasonService) { }

    @Post('leagues/:leagueId/seasons')
    @ApiParam({ name: 'leagueId', type: String })
    create(@Param('leagueId') leagueId: string, @Body() dto: SeasonDto) {
        return this.seasonService.create(leagueId, dto);
    }

    @Get('leagues/:leagueId/seasons')
    @ApiParam({ name: 'leagueId', type: String })
    @ApiResponse({ status: 200, type: [SeasonDto] })
    findAllByLeague(@Param('leagueId') leagueId: string) {
        return this.seasonService.findAllByLeague(leagueId);
    }

    @Get('seasons/:id')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, type: SeasonDto })
    findById(@Param('id') id: string) {
        return this.seasonService.findById(id);
    }

    @Patch('seasons/:id')
    @ApiParam({ name: 'id', type: String })
    update(@Param('id') id: string, @Body() dto: SeasonDto) {
        return this.seasonService.update(id, dto);
    }

    @Delete('seasons/:id')
    @ApiParam({ name: 'id', type: String })
    delete(@Param('id') id: string) {
        return this.seasonService.delete(id);
    }
}
