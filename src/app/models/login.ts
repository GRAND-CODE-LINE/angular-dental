export interface LoginResponse {
    accessToken: string;
    tokenType: string;
    id: string;
    username: string;
    email: string;
    roles: any[];




}

export interface Login {
    username: string;
    password: string;
}
