import { Types } from 'mongoose';
export class SeasonDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  startDate?: string;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  endDate?: string;

  @ApiPropertyOptional({ type: String })
  league?: string;

  @ApiPropertyOptional({ type: String })
  rules?: string;

  @ApiPropertyOptional({ type: [String] })
  teams?: string[];

  static toDto(season: any): SeasonDto {
    const dto = new SeasonDto();
    dto.id = season._id?.toString();
    dto.name = season.name;
    dto.startDate = season.startDate ? season.startDate.toISOString() : undefined;
    dto.endDate = season.endDate ? season.endDate.toISOString() : undefined;
    dto.league = season.league ? season.league.toString() : undefined;
    dto.rules = season.rules ? season.rules.toString() : undefined;
    dto.teams = season.teams?.map((t: any) => t.toString()) ?? [];
    return dto;
  }
}
import { IsString, IsOptional, IsDateString, IsArray, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSeasonDto {
  @ApiProperty({ example: '2024/2025' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsMongoId()
  league?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsMongoId()
  rules?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  teams?: string[];
}

export class UpdateSeasonDto {
  @ApiPropertyOptional({ example: '2024/2025' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsMongoId()
  league?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsMongoId()
  rules?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  teams?: string[];
}
