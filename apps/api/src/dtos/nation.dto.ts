import { ApiProperty } from '@nestjs/swagger';

export class NationDto {
  @ApiProperty({ example: '64e4b8f2c2a4b2e4d8e4b8f2', description: 'MongoDB ObjectId', required: false })
  id?: string;

  @ApiProperty({ example: 'Italy', description: 'The name of the nation' })
  name: string;

  @ApiProperty({ example: 'ITA', description: 'ISO code of the nation', required: false })
  code?: string;

  @ApiProperty({ example: 'https://flagcdn.com/it.svg', description: 'URL to the flag image', required: false })
  flagUrl?: string;

  @ApiProperty({ example: '🇮🇹', description: 'Flag emoji as fallback', required: false })
  flagEmoji?: string;
}
