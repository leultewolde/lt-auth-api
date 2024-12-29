const ENV = process.env.NODE_ENV || 'development';

export const BASE_URL =
    ENV === 'test' ? 'http://localhost:8081' : 'https://exmaple.com';

export const LOGIN_URL = `${BASE_URL}/auth/login/`;
export const REGISTER_URL = `${BASE_URL}/auth/register/`;
export const SESSIONS_URL = `${BASE_URL}/sessions`;