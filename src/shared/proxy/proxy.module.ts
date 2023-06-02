import { Module } from "@nestjs/common";
import { ClientProxyCrediPremium } from './client.proxy';
@Module({
    providers: [ClientProxyCrediPremium],
    exports: [ClientProxyCrediPremium]
})
export class ProxyModule { }