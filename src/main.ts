import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DateTime } from 'luxon';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { RabbitMQ } from './shared/enum/proxy.enum';
const nodeEnv = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.join(__dirname, `../../../.env.${nodeEnv}`) });
async function bootstrap() {
  const portServer = process.env.PORTSERVER || 3001;
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appVersion = configService.get<string>('APP_VERSION');
  const stage = process.env.NODE_ENV || 'development';
  const appName = configService.getOrThrow<string>('APP_NAME') || 'Not defined';
  const d = DateTime.local();
  const timezone = d.zoneName;
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: RabbitMQ.UserQueue,
      queueOptions: {
        host: '0.0.0.0',
        port: portServer,
        durable: true,
      },
    },
  });
  app.startAllMicroservices().then(() => {
    Logger.log('Mapped {/, GET} Swagger api route', 'RouterExplorer');
    Logger.log('Mapped {/docs, GET} Swagger api route', 'RouterExplorer');
    Logger.log(`Enviroment running at ${stage}`);
    Logger.log(`🚀  App Name: CrediPremium ${appName}`);
    Logger.log(`🚀  Timezone:  ${timezone}`);
    Logger.log(`🚀  Version:  ${appVersion}`);
    Logger.log(`🚀  Server is running at ${portServer}`);
  }).catch((error) => {
    Logger.error(`Error starting the server ${error}`);
  });
}
bootstrap();