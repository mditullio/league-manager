import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { StageService } from '../services/stage.service';
import { StageDto } from '../dtos/stage.dto';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Stages')
@Controller()
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Post('seasons/:seasonId/stages')
  @ApiParam({ name: 'seasonId', type: String })
  @ApiResponse({ status: 201, type: StageDto })
  create(@Param('seasonId') seasonId: string, @Body() dto: StageDto) {
    return this.stageService.create({ ...dto, season: { id: seasonId, name: '' } });
  }

  @Get('seasons/:seasonId/stages')
  @ApiParam({ name: 'seasonId', type: String })
  @ApiResponse({ status: 200, type: [StageDto] })
  findAllBySeason(@Param('seasonId') seasonId: string) {
    return this.stageService.findAllBySeason(seasonId);
  }

  @Get('stages/:id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: StageDto })
  findById(@Param('id') id: string) {
    return this.stageService.findById(id);
  }

  @Patch('stages/:id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: StageDto })
  update(@Param('id') id: string, @Body() dto: StageDto) {
    return this.stageService.update(id, dto);
  }

  @Delete('stages/:id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: StageDto })
  delete(@Param('id') id: string) {
    return this.stageService.delete(id);
  }
}
