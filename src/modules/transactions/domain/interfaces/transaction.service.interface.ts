import { Injectable } from '@nestjs/common';
import { CreateTransactionDto, ValidateTransactionsFiltersPipeDto } from '../../application/dto/create-transaction.dto';
import { IListTransactions, ITransactions } from './transaction.interface';
import { UpdateTransactionDto } from '../../application/dto/update-transaction.dto';

@Injectable()
export abstract class ITransactionsService {
    abstract create(createTransactionDto: CreateTransactionDto): Promise<ITransactions>
    abstract findAll(qs: ValidateTransactionsFiltersPipeDto): Promise<IListTransactions> 
    abstract findOne(id: string): Promise<ITransactions>
    abstract update(id: string, updateUserDto: Partial<UpdateTransactionDto>) : Promise<ITransactions>
    abstract remove(id: string): Promise<{ message: string }>
}
