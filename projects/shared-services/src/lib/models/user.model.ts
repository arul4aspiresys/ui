export interface User {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
}

export interface UserLogin {
    username: string;
    password: string;
}