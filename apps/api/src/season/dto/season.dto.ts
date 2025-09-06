import { ApiProperty } from '@nestjs/swagger';

export class SeasonDto {
    
  @ApiProperty({ example: '64e4b8f2c2a4b2e4d8e4b8f2', description: 'MongoDB ObjectId', required: false })
  id?: string;

  @ApiProperty({ example: '2024/2025', required: false })
  name: string;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  startDate?: string;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  endDate?: string;

  @ApiProperty({ type: String, required: false })
  league?: string;

  @ApiProperty({ type: String, required: false })
  rules?: string;

  @ApiProperty({ type: [String], required: false })
  teams?: string[];
}
