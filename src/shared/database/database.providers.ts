import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { modelsDB } from './models';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => {
            const sequelize = new Sequelize({
                dialect: config.get('DIALECT_DB'),
                host: config.get('HOST_DATABASE'),
                port: parseInt(config.get('PORT_DB')),
                username: config.get('USERNAME_DB'),
                password: config.get('PASSWORD_DB'),
                database: config.get('DATABASE'),
                logging: false,
            });
            sequelize.addModels(modelsDB);
            return sequelize;
        },
    },
];