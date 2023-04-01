export interface LoginResponse {
    token: string;
    type: string;
    id: string;
    username: string;
    email: string;
    roles: any[];
}

export interface Login {
    username: string;
    password: string;
}
