import { Column, DataType, Table, Model, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { TransactionCurrencyEnum, TransactionStatusEnum } from 'src/shared/enum/transaction.enum';
import { v4 as uuidv4 } from 'uuid';

@Table({
    tableName: 'transactions'
})
export class Transactions extends Model<Transactions> {
    @Column({
        type: DataType.UUIDV4,
        defaultValue: () => {
            return uuidv4();
        },
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    public id: string;
    @Column({
        type: DataType.NUMBER,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'amount',
    })
    amount: number;
    @Column({
        type: DataType.UUIDV4,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'user_id',
    })
    userId: string;
    @Column({
        type: DataType.ENUM(
            TransactionCurrencyEnum.USD,
            TransactionCurrencyEnum.COP,
        ),
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'currency',
        defaultValue: () => {
            return TransactionCurrencyEnum.COP;
        },
    })
    currency: string;
    @Column({
        type: DataType.NUMBER,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'taxes',
    })
    taxes: number;
    @Column({
        type: DataType.ENUM(
            TransactionStatusEnum.PENDING,
            TransactionStatusEnum.APPROVED,
            TransactionStatusEnum.REJECTED,
        ),
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'transaction_status',
    })
    transactionStatus: string;
    @CreatedAt public created_at: Date;
    @UpdatedAt public updated_at: Date;
}