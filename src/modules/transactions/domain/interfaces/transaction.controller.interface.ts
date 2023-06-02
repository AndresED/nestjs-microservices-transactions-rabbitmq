
export interface IUpdateTransactionDto{
    amount?: number;
    userId?: string;
    currency?: string;
    taxes?: number;
    transactionStatus?: string
}
export interface IUpdateData{
    id: string;
    updateTransactionDto: Partial<IUpdateTransactionDto>;
}