import { ApiProperty } from '@nestjs/swagger';

export class SeasonDto {
    
  @ApiProperty({ example: '64e4b8f2c2a4b2e4d8e4b8f2', description: 'MongoDB ObjectId', required: false })
  id?: string;

  @ApiProperty({ example: { id: '64e4b8f2c2a4b2e4d8e4b8f2', name: 'Serie A' }, description: 'League object with id and name', required: false })
  league?: { id: string; name?: string };

  @ApiProperty({ example: '2024/2025', required: false })
  name: string;

  @ApiProperty({ type: String, format: 'date', required: false })
  startDate?: string;

  @ApiProperty({ type: String, format: 'date', required: false })
  endDate?: string;

}
