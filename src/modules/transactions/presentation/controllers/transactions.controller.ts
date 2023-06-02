import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IUpdateData } from '../../domain/interfaces/transaction.controller.interface';
import { TransactionsService } from '../../application/services/transactions.service';
import { TransactionMSG } from '../../../../shared/proxy/constants';
import { CreateTransactionDto, ValidateTransactionsFiltersPipeDto } from '../../application/dto/create-transaction.dto';
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  @MessagePattern(TransactionMSG.CREATE)
  create(@Payload() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }
  @MessagePattern(TransactionMSG.FIND_ALL)
  findAll(@Payload() query: ValidateTransactionsFiltersPipeDto) {
    return this.transactionsService.findAll(query);
  }
  @MessagePattern(TransactionMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.transactionsService.findOne(id);
  }
  @MessagePattern(TransactionMSG.UPDATE)
  update(@Payload() payload: IUpdateData) {
    return this.transactionsService.update(payload.id, payload.updateTransactionDto);
  }
  @MessagePattern(TransactionMSG.DELETE)
  remove(@Payload() id: string) {
    return this.transactionsService.remove(id);
  }
}
