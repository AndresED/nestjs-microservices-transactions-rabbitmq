export class CreateTransactionDto {
    amount: number;
    userId: string;
    currency: string;
    taxes: number;
    transactionStatus: string
}

export class TransactionDto {
    id: string;
    amount: number;
    userId: string;
    currency: string;
    taxes: number;
    transactionStatus: string
}

export class ValidateTransactionsFiltersPipeDto {
    transactionStatus: string;
    userId: string;
    limit: number;
    page: number;
}