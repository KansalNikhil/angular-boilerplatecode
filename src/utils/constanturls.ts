import { environment } from '../environments/environment';

export const BASE_URL = environment.apiUrl;

//AUTH URLs
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const FORGOT_PASSWORD = `${BASE_URL}/auth/forgotpassword`;
export const CHANGE_PASSWORD = `${BASE_URL}/auth/resetpassword`;

//USER URLs
export const GET_USER = `${BASE_URL}/user/getuser`;
export const UPDATE_USER = `${BASE_URL}/user/updateuser`;
export const GET_INFO = `${BASE_URL}/user/getinfo`;
export const UPDATE_INFO = `${BASE_URL}/user/updateinfo`;
export const DEACTIVATE_USER = `${BASE_URL}/user/deactivateuser`;
