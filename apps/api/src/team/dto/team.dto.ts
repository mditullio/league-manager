import { ApiProperty } from '@nestjs/swagger';

export class TeamDto {
  @ApiProperty({ example: '64e4b8f2c2a4b2e4d8e4b8f2', description: 'MongoDB ObjectId', required: false })
  id?: string;

  @ApiProperty({ example: 'Juventus', description: 'The name of the team' })
  name!: string;

  @ApiProperty({ example: 'JUV', description: 'Short name of the team', required: false })
  shortName?: string;

  @ApiProperty({ example: 'https://logo.com/juventus.svg', description: 'URL to the team logo', required: false })
  logoUrl?: string;

  @ApiProperty({ example: '64e4b8f2c2a4b2e4d8e4b8f2', description: 'Nation ObjectId', required: false })
  nation?: string;

  @ApiProperty({ example: 1897, description: 'Year founded', required: false })
  founded?: number;

  @ApiProperty({ example: 'Turin', description: 'City', required: false })
  city?: string;

  @ApiProperty({ example: 'Allianz Stadium', description: 'Stadium', required: false })
  stadium?: string;

  @ApiProperty({ example: ['black', 'white'], description: 'Team colors', required: false, isArray: true })
  colors?: string[];
}