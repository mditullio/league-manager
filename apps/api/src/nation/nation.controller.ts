import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { NationService } from './nation.service';
import { NationDto } from './dto/nation.dto';

@ApiTags('Nations')
@Controller('nations')
export class NationController {
    constructor(private readonly nationService: NationService) { }

    @Post()
    @ApiBody({ type: NationDto })
    @ApiResponse({ status: 201, type: NationDto })
    create(@Body() body: NationDto) {
        return this.nationService.create(body);
    }

    @Get()
    @ApiResponse({ status: 200, type: [NationDto] })
    @ApiQuery({ name: 'name', required: false, description: 'Filter nations whose name starts with this value (case-insensitive)' })
    findAll(@Query('name') name?: string) {
        return this.nationService.findAll(name);
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, type: NationDto })
    findOne(@Param('id') id: string) {
        return this.nationService.findOne(id);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: NationDto })
    @ApiResponse({ status: 200, type: NationDto })
    update(@Param('id') id: string, @Body() body: NationDto) {
        return this.nationService.update(id, body);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Nation deleted' })
    remove(@Param('id') id: string) {
        return this.nationService.remove(id);
    }
}
