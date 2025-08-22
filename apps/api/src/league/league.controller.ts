import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { LeagueService } from './league.service';
import { LeagueDto } from './dto/league.dto';

@ApiTags('Leagues')
@Controller('leagues')
export class LeagueController {
	constructor(private readonly leagueService: LeagueService) {}

	@Post()
	@ApiBody({ type: LeagueDto })
	@ApiResponse({ status: 201, type: LeagueDto })
	create(@Body() body: LeagueDto) {
		return this.leagueService.create(body);
	}

	@Get()
	@ApiResponse({ status: 200, type: [LeagueDto] })
	@ApiQuery({ name: 'nation', required: false, description: 'Nation ObjectId to filter leagues' })
	@ApiQuery({ name: 'name', required: false, description: 'Filter leagues whose name starts with this value (case-insensitive)' })
	findAll(@Query('nation') nation?: string, @Query('name') name?: string) {
		return this.leagueService.findAll(nation, name);
	}

	@Get(':id')
	@ApiParam({ name: 'id', type: String })
	@ApiResponse({ status: 200, type: LeagueDto })
	findOne(@Param('id') id: string) {
		return this.leagueService.findOne(id);
	}

	@Put(':id')
	@ApiParam({ name: 'id', type: String })
	@ApiBody({ type: LeagueDto })
	@ApiResponse({ status: 200, type: LeagueDto })
	update(@Param('id') id: string, @Body() body: LeagueDto) {
		return this.leagueService.update(id, body);
	}

	@Delete(':id')
	@ApiParam({ name: 'id', type: String })
	@ApiResponse({ status: 200, description: 'League deleted' })
	remove(@Param('id') id: string) {
		return this.leagueService.remove(id);
	}
}
