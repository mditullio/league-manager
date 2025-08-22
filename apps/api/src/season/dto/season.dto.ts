import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSeasonDto {
  @ApiProperty({ example: '2024/2025' })
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
}

export class UpdateSeasonDto {
  @ApiPropertyOptional({ example: '2024/2025' })
  name?: string;

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
}
