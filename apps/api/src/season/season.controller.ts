import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { SeasonService } from './season.service';
import { CreateSeasonDto, UpdateSeasonDto } from './dto/season.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('seasons')
@Controller()
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Post('leagues/:leagueId/seasons')
  @ApiParam({ name: 'leagueId', type: String })
  create(@Param('leagueId') leagueId: string, @Body() dto: CreateSeasonDto) {
    return this.seasonService.create(leagueId, dto);
  }

  @Get('leagues/:leagueId/seasons')
  @ApiParam({ name: 'leagueId', type: String })
  findAllByLeague(@Param('leagueId') leagueId: string) {
    return this.seasonService.findAllByLeague(leagueId);
  }

  @Get('seasons/:id')
  @ApiParam({ name: 'id', type: String })
  findById(@Param('id') id: string) {
    return this.seasonService.findById(id);
  }

  @Patch('seasons/:id')
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id: string, @Body() dto: UpdateSeasonDto) {
    return this.seasonService.update(id, dto);
  }

  @Delete('seasons/:id')
  @ApiParam({ name: 'id', type: String })
  delete(@Param('id') id: string) {
    return this.seasonService.delete(id);
  }
}
