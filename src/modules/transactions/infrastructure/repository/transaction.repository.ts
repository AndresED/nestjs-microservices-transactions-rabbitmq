import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { IListTransactions, ITransactions } from "../../domain/interfaces/transaction.interface";
import { CountOptions, FindOptions, Op } from 'sequelize';
import { Transactions } from "../../domain/entities/transaction.entity";
import { CreateTransactionDto, ValidateTransactionsFiltersPipeDto } from "../../application/dto/create-transaction.dto";
import { UpdateTransactionDto } from "../../application/dto/update-transaction.dto";
import { ITransactionsRepository } from "../../domain/interfaces/transaction.repository.interface";

@Injectable()
export class TransactionsRepository implements ITransactionsRepository{
    constructor(
        @Inject('TransactionsRepository') private readonly transactions: typeof Transactions
    ) { }
    async create(createTransactionDto: CreateTransactionDto): Promise<ITransactions> {
        try {
            return this.transactions.create(createTransactionDto);
        } catch (error) {
            Logger.error(error);
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findAll(qs: ValidateTransactionsFiltersPipeDto): Promise<IListTransactions> {
        const { limit } = qs;
        const query = this.buildQuery(qs);
        const counter = await this.transactions.findAndCountAll(query.querybaseCount);
        const result = await this.transactions.findAll(query.querybase);
        const pages: number = Math.ceil(counter.count / limit);
        return {
            result,
            count: counter.count,
            pages,
        };
    }

    async findOne(id: string): Promise<ITransactions> {
        try {
            const result: any = await this.transactions.findOne({
                where: {
                    id,
                },
            });
            if (!result) {
                throw new HttpException({ message: 'transaction_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return result;
        } catch (error) {
            Logger.error(error);
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    
    async update(id: string, updateUserDto: Partial<UpdateTransactionDto>): Promise<ITransactions> {
        try {
            const existElement = await this.transactions.findOne({ where: { id } });
            if (!existElement) {
                throw new HttpException({ message: 'transaction_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            await this.transactions.update(updateUserDto, {
                where: {
                    id,
                }
            });
            const response = await this.findOne(id);
            return response;
        } catch (error) {
            Logger.error(error);
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async remove(id: string): Promise<{ message: string }> {
        try {
            const result = await this.transactions.findOne({ where: { id } })
            if (!result) {
                throw new HttpException({ message: 'transaction_not_found' }, HttpStatus.NOT_FOUND)
            }
            await this.transactions.destroy({
                where: {
                    id,
                },
            });
            return { message: 'transaction_deleted' }
        } catch (error) {
            Logger.error(error);
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    } 
    buildQuery(qs: ValidateTransactionsFiltersPipeDto): { querybase: FindOptions, querybaseCount: CountOptions } {
        try {
            const { limit, page, transactionStatus, userId } = qs;
            const wheres = [];
            const querybase: FindOptions = {};
            const offset: number = (page - 1) * limit;
            if (transactionStatus) {
                const data = {
                    transactionStatus
                };
                wheres.push(data);
            }
            if (userId) {
                const data = {
                    userId
                };
                wheres.push(data);
            }
            querybase.where = {
                [Op.and]: wheres,
            };
            const querybaseCount: CountOptions = querybase;
            querybase.limit = parseInt(limit + '');
            querybase.offset = offset;
            querybaseCount.distinct = true;
            return {
                querybase,
                querybaseCount
            };
        } catch (error) {
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}