import { Transactions } from "../../domain/entities/transaction.entity";

export const TransactionsProvider = {
    provide: 'TransactionsRepository',
    useValue: Transactions,
};
