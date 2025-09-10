import { Controller, Get } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Controller('api/admin')
export class AdminController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('health')
  async healthCheck() {
    try {
      // Check connection state
      const isConnected = this.connection.readyState === 1;
      // List collections
      const db = this.connection.db;
      const collections = db ? await db.listCollections().toArray() : [];
      return {
        status: isConnected ? 'up' : 'down',
        dbName: db ? db.databaseName : null,
        collections: collections.map(c => c.name),
      };
    } catch (error) {
      return { status: 'error', error: error.message };
    }
  }
}
