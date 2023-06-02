import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { TransactionsController } from './presentation/controllers/transactions.controller';
import { TransactionsProvider } from './infrastructure/provider/transaction.provider';
import { TransactionsRepository } from './infrastructure/repository/transaction.repository';
import { TransactionsService } from './application/services/transactions.service';

@Module({
  controllers: [TransactionsController],
  imports: [
    SharedModule
  ],
  providers: [
    TransactionsProvider,
    TransactionsRepository,
    TransactionsService,
  ],
  exports: [
    TransactionsProvider,
    TransactionsRepository,
    TransactionsService,
  ]
})
export class TransactionsModule {}
