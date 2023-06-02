export interface IUser{
    id: string;
    ame: string;
    email: string;
    password: string;
    role: string;
    created_at?: string;
    updated_at?: string;
}

export interface IListUsers{
    result: IUser[];
    count: number;
    pages: number;
}