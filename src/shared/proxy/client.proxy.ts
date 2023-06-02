import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabbitMQ } from "./constants";

@Injectable()
export class ClientProxyCrediPremium {
    constructor(
        private readonly configService: ConfigService
    ) { }
    clientProxyTransactions(): ClientProxy {
        return ClientProxyFactory.create({
            options: {
                transport: Transport.RMQ,
                urls: this.configService.get<string>('RABBITMQ_URL'),
                queue: RabbitMQ.UserQueue,
            }
        })
    }
}