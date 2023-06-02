import { Injectable } from '@nestjs/common';
import { CreateTransactionDto, ValidateTransactionsFiltersPipeDto } from '../../application/dto/create-transaction.dto';
import { UpdateTransactionDto } from '../../application/dto/update-transaction.dto';
import { ITransactions, IListTransactions } from './transaction.interface';
import { CountOptions, FindOptions } from 'sequelize';

@Injectable()
export abstract class ITransactionsRepository {
    abstract create(createTransactionDto: CreateTransactionDto): Promise<ITransactions>
    abstract findAll(qs: ValidateTransactionsFiltersPipeDto): Promise<IListTransactions> 
    abstract findOne(id: string): Promise<ITransactions>
    abstract update(id: string, updateUserDto: Partial<UpdateTransactionDto>) : Promise<ITransactions>
    abstract remove(id: string): Promise<{ message: string }>
    abstract buildQuery(qs: ValidateTransactionsFiltersPipeDto): { querybase: FindOptions, querybaseCount: CountOptions }
}
