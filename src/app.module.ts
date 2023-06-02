import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvFilePath } from 'config/enviroments';
import { ScheduleModule } from '@nestjs/schedule';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { SharedModule } from './shared/shared.module';
import { DatabaseModule } from './shared/database/database.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath()
    }),
    HttpModule,
    ScheduleModule.forRoot(),
    SendGridModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        apiKey: config.get<string>('SENGRIDAPIKEY'),
      }),
    }),
    DatabaseModule,
    SharedModule,
    TransactionsModule
  ],
  providers: [],
})
export class AppModule {}
