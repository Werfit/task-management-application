import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { validate } from './utils/validators/environment.validator';
import { TaskModule } from './task/task.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      validate,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return new DataSource(options).initialize();
      },
    }),
    DashboardModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
