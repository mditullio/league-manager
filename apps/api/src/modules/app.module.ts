
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { AdminController } from '../controllers/admin.controller';
import { NationModule } from './nation.module';
import { TeamModule } from './team.module';
import { LeagueModule } from './league.module';
import { SeasonModule } from './season.module';
import { StageModule } from './stage.module';
import { MatchModule } from './match.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    NationModule,
    TeamModule,
    LeagueModule,
    SeasonModule,
    StageModule,
    MatchModule
  ],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}
