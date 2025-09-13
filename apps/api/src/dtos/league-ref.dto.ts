import { ApiProperty } from '@nestjs/swagger';


export class LeagueRefDto {
    @ApiProperty({ example: '64e4b8f2c2a4b2e4d8e4b8f2' })
    id!: string;

    @ApiProperty({ example: 'Serie A' })
    name!: string;
}
