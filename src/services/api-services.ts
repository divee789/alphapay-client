
import axios from 'axios';
import { Logger } from '../utils/index';
import { Storage } from '../services/storage-services';
import APIServiceError from './error-services';
import decode from 'jwt-decode';

const APIBaseURL = process.env.BASE_URL || 'http://localhost:7000';

export default class APIRequest {

    public instance: any
    public instance2: any
    constructor(baseURL: any) {
        this.instance = axios.create({
            baseURL: baseURL || APIBaseURL,
            timeout: 10000,
            headers: {
                Accept: 'application/json'
            }
        });
        this.instance2 = axios.create({
            baseURL: baseURL || APIBaseURL,
            timeout: 10000,
            headers: {
                Accept: 'multipart/form-data'
            }
        });
        this.instance.interceptors.request.use(
            (config: any) => {
                Logger.info('Request: ', config.url);
                return config;
            },
            (error: any) => {
                Logger.error('Request Error: ', error);
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (response: any) => {
                Logger.info('Response: ', response.config.method, response.config.url, response.status);
                return response;
            },
            (error: any) => {
                if (!error.response) {
                    Logger.error('Response: ', 'Network Error');
                    return Promise.reject(
                        new APIServiceError({
                            status: 500,
                            data: {
                                message: 'Network Error, try again',
                                error: 'server_error',
                                data: null
                            }
                        })
                    );
                }
                Logger.warn('Response: ', error.response);
                return Promise.reject(new APIServiceError(error.response));
            }
        );
        this.checkAuthToken();
    }

    checkAuthToken = () => {
        const token = Storage.checkAuthentication();
        this.setHeader(token);
    };

    setHeader = (token: string) => {
        this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
        this.instance2.defaults.headers.common.Authorization = `Bearer ${token}`;
    };

    clearHeader() {
        delete this.instance.defaults.headers.common.Authorization;
        delete this.instance2.defaults.headers.common.Authorization;

    }
    isloggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = Storage.checkAuthentication();
        //Check for existence of token
        if (token !== false) {
            const expired = this.isTokenExpired(token)
            console.log('expired', expired)
            //check if token is not expired
            if (!expired) {
                console.log('wooaah')
                return true
            } else {
                console.log('hey')
                //If token is expired return false
                return false
            }

        }
        console.log('wow')
        return false
    };

    isTokenExpired = (token: string) => {
        try {
            const decoded: any = decode(token);
            const exp: number = decoded.exp
            const date = Date.now() / 1000
            if (exp < date) {
                console.log('expired token found');
                this.logout()
                return true;
            } else {
                console.log('not expired')
                return false;
            }

        } catch (err) {
            console.log('expired check failed');
            console.log(err)
            return false;
        }
    };

    logout = () => {
        Storage.removeItem('userToken');
        Storage.removeItem('refreshToken');
        Storage.removeItem('userTokenExpiration');
    };

    setToken = (token: string) => {
        this.setHeader(token);
    };

    storeUserToken = (token: any, refreshToken: any, userTokenExpiration: any) => {
        Storage.setItem('userToken', token);
        Storage.setItem('refreshToken', refreshToken);
        Storage.setItem('userTokenExpiration', userTokenExpiration);
    };

    logIn = async (data: any) => {
        const body = {
            ...data
        };

        const response = await this.instance.post('/auth/login', body);
        const authResponse = response.data;
        console.log(authResponse)
        this.storeUserToken(authResponse.access_token, authResponse.refresh_token, authResponse.expires_in);
        this.setToken(authResponse.access_token);
        const user = await this.instance.get('/auth/user');
        console.log(user);
        const profileResponse = user.data.user;
        return { ...authResponse, user: profileResponse };
    };

    signUp = async (data: any) => {
        const body = {
            ...data
        };
        const response = await this.instance.post('/auth/register', body);
        const authResponse = response.data;
        this.storeUserToken(authResponse.access_token, authResponse.refresh_token, authResponse.expires_in);
        this.setToken(authResponse.access_token);
        const user = await this.instance.get('/auth/user');
        console.log(user);
        const profileResponse = user.data.user;
        return { ...authResponse, user: profileResponse };
    };
    update = async (data: any) => {
        const body = {
            ...data
        };
        const response = await this.instance.post('/user/update', body);
        const authResponse = response.data;
        console.log(authResponse)
        const user = await this.instance.get('/user');
        console.log(user);
        const profileResponse = user.data.profile;
        return { user: profileResponse };
    };
    refresh = async (refresh_token: string) => {
        try {
            const body = {
                refresh_token: refresh_token
            };
            const response = await this.instance.post('/user/token', body);
            if (!response) {
                console.log('no response');
            }
            const authResponse = response.data;
            console.log('refresh', authResponse);
            this.storeUserToken(authResponse.access_token, authResponse.refresh_token, authResponse.expires_in);
            this.setToken(authResponse.access_token);
            return authResponse;
        } catch (e) {
            console.log('e', e);
            console.log(e.response.status);
            return e.response;
        }
    };

    verifyEmail = async (data) => {
        const res = await this.instance.get('/auth/verify_email?token=' + data)
        return res
    }

    passwordReset = async (data) => {
        const res = await this.instance.get(`/auth/password_reset_request?matriculation_number=${data}`)
        return res
    }

    confirmPasswordReset = async (token: string) => {
        const res = await this.instance.get(`/auth/password_reset_confirmation?password_reset_token=${token}`)
        return res
    }

    passwordResetEmail = async (data) => {
        console.log('email data', data)
        const res = await this.instance.post('/auth/password_reset_email', {
            matriculation_number: data.matriculation_number,
            password: data.password.trim()
        })
        return res
    }

    uploadProfileImage = async (data: any) => {
        try {
            const res = await this.instance2.post('/auth/upload', data)
            console.log(res)
            return res.data.client
        } catch (error) {
            console.log(error)
        }
    }

}

