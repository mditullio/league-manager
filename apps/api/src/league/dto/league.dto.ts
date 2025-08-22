import { ApiProperty } from '@nestjs/swagger';

export class LeagueDto {
  @ApiProperty({ example: '64e4b8f2c2a4b2e4d8e4b8f2', description: 'MongoDB ObjectId', required: false })
  id?: string;

  @ApiProperty({ example: 'Serie A', description: 'The name of the league' })
  name!: string;

  @ApiProperty({ example: '64e4b8f2c2a4b2e4d8e4b8f2', description: 'Nation ObjectId', required: false })
  nation?: string;

  @ApiProperty({ example: 'https://logo.com/seriea.svg', description: 'URL to the league logo', required: false })
  logoUrl?: string;

  @ApiProperty({ example: 'Top Italian football league', description: 'Description of the league', required: false })
  description?: string;
}
