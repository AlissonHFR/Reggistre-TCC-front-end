interface IPermissions {
    id: number;
    name: string;
    description: string;
}
interface IRoles {
    id: number;
    name: string;
    permissions: IPermissions[];
}
export interface IUser {
    id: number;
    email: string;
    roles: IRoles[];
}
export interface IUserData {
    // user: IUser;
    // type: string;
    token: string;
}