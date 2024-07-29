export interface LoginResponse {
    access_token?: string;
    tokenType?: string;
    id?: string;
    username?: string;
    email?: string;
    roles?: any[];
    expires_in?: any
    refresh_expires_in?: any,
    refresh_token?: any,
    scope?: any,
    session_state?: any,
    token_type?: any,
}

export interface Login {
    username: string;
    password: string;
    client_id?: string;
    client_secret?: string;
    grant_type?: string
}
