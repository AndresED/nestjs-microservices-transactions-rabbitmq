export enum RabbitMQ{
    UserQueue = 'users',
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