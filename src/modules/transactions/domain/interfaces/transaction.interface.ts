export interface ITransactions{
    id: string;
    amount: number;
    userId: string;
    currency: string;
    taxes: number;
    transactionStatus: string
    created_at: Date;
    updated_at: Date;
}


export interface IListTransactions{
    result: ITransactions[];
    count: number;
    pages: number;
}