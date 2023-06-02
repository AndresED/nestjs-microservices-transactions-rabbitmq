export enum RabbitMQ{
    UserQueue = 'users',
    TransactionQueue = 'transactions',
}
export enum UserMSG{
    CREATE = 'CREATE_USER',
    CREATE_ADMIN = 'CREATE_USER_ADMIN',
    FIND_ALL = 'FIND_ALL_USER',
    FIND_ALL_ADMIN = 'FIND_ALL_USER_ADMIN',
    FIND_ONE = 'FIND_ONE_USER',
    UPDATE = 'UPDATE_USER',
    DELETE = 'DELETE_USER',
}
export enum TransactionMSG{
    CREATE = 'CREATE_TRANSACTION',
    FIND_ALL = 'FIND_ALL_TRANSACTION',
    FIND_ONE = 'FIND_ONE_TRANSACTION',
    UPDATE = 'UPDATE_TRANSACTION',
    DELETE = 'DELETE_TRANSACTION',
}
