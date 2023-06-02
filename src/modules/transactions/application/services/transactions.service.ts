import { Injectable } from '@nestjs/common';
import { CreateTransactionDto, ValidateTransactionsFiltersPipeDto } from '../dto/create-transaction.dto';
import { TransactionsRepository } from '../../infrastructure/repository/transaction.repository';
import { IListTransactions, ITransactions } from '../../domain/interfaces/transaction.interface';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { ITransactionsService } from '../../domain/interfaces/transaction.service.interface';

@Injectable()
export class TransactionsService implements ITransactionsService{
  constructor(
    private readonly transactionsRepository: TransactionsRepository
  ){}
  async create(createUserDto: CreateTransactionDto): Promise<ITransactions> { 
    try {
      return await this.transactionsRepository.create(createUserDto);
    } catch (error) {
      return error;
    }
  }
  async findAll(qs: ValidateTransactionsFiltersPipeDto): Promise<IListTransactions> {
    try {
      return await this.transactionsRepository.findAll(qs);
    } catch (error) {
      return error;
    }
  }
  async findOne(id: string): Promise<ITransactions> {
    try {
      return await this.transactionsRepository.findOne(id);
    } catch (error) {
      return error;
    }
  }
  async update(id: string, updateUserDto: Partial<UpdateTransactionDto>) : Promise<ITransactions>{
    try {
      return await this.transactionsRepository.update(id,updateUserDto);
    } catch (error) {
      return error;
    }
  }
  async remove(id: string): Promise<{ message: string }>{
    try {
      return await this.transactionsRepository.remove(id);
    } catch (error) {
      return error;
    }
  }
}
