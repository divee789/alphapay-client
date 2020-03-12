
import axios from 'axios';
import { Logger } from '../utils/index';
import { Storage } from '../services/storage-services';
import APIServiceError from './error-services';
import decode from 'jwt-decode';

// const APIBaseURL = 'http://157.245.36.216:7000'
const APIBaseURL = 'http://localhost:7000'
// const APIBaseURL = 'https://alphapay-api.herokuapp.com'



console.log(APIBaseURL)

export default class APIRequest {

    public instance: any
    public instance2: any
    constructor(baseURL: any) {
        this.instance = axios.create({
            baseURL: APIBaseURL,
            timeout: 50000,
            headers: {
                Accept: 'application/json'
            }
        });
        this.instance2 = axios.create({
            baseURL: baseURL || APIBaseURL,
            timeout: 50000,
            headers: {
                Accept: 'multipart/form-data'
            }
        });
        this.instance.interceptors.request.use(
            (config: any) => {
                const userToken = this.setAuthorization();
                config.headers.Authorization = userToken;
                Logger.info('Request: ', config.url, config.headers);
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
                console.log(error)
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
                this.logOut()
                return true;
            } else {
                return false;
            }

        } catch (err) {
            console.log('expired check failed');
            console.log(err)
            return false;
        }
    };
    setAuthorization = () => {
        const userToken = Storage.getItem('userToken');
        // Check if user if authenticated if not return client token
        if (userToken) {
            return `Bearer ${userToken}`;
        }
    };

    storeUserToken = (token: string, refreshToken: string) => {
        Storage.setItem('userToken', token);
        Storage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('logged', 'success')
    };

    logIn = async (data: any) => {
        const body = {
            ...data
        };
        const response = await this.instance.post('/auth/login', body);
        this.storeUserToken(response.data.data.access_token, response.data.data.refresh_token);
        // this.setHeader(response.data.data.access_token);
        const profileResponse = response.data.data.client;
        return { ...response.data, client: profileResponse };
    };

    signUp = async (data: any) => {
        const body = {
            ...data
        };
        const response = await this.instance.post('/auth/signup', body);
        const authResponse = response.data;
        this.storeUserToken(authResponse.data.access_token, authResponse.data.refresh_token);
        // this.setHeader(authResponse.access_token);
        const profileResponse = authResponse.data.client;
        return { ...authResponse, client: profileResponse };
    };
    update = async (data: any) => {
        const body = {
            ...data
        };
        const response = await this.instance.patch('/auth/update', body);
        if (response.data.success) {
            return {
                client: response.data.data,
                message: response.data.message
            }
        }
        return {
            error: true,
            message: response.data.message
        }

    };

    changePassword = async (data: any) => {
        const body = {
            ...data
        };
        const response = await this.instance.patch('/auth/password', body);
        if (response.data.success) {
            return {
                message: response.data.message
            }
        }
        return {
            error: true,
            message: response.data.message
        }

    };
    refresh = async (refresh_token: string) => {
        const body = {
            refresh_token
        };
        const response = await this.instance.post('/client/token', body);
        if (!response) {
            console.log('no response');
        }
        const authResponse = response.data;
        console.log('refresh', authResponse);
        this.storeUserToken(authResponse.access_token, authResponse.refresh_token);
        this.setHeader(authResponse.access_token);
        return authResponse;
    }

    logOut = async (client_email?: string) => {
        console.log('log out api', client_email)
        const refresh_token = Storage.getItem('refreshToken')
        Storage.removeItem('userToken');
        Storage.removeItem('refreshToken');
        Storage.removeItem('userTokenExpiration');
        if (client_email) {
            console.log('email', client_email)
            const res = await this.instance.post('/auth/logout', {
                client_email, refresh_token
            })
            console.log(res)
        }
        this.clearHeader()
    }

    verifyEmail = async (data) => {
        const res = await this.instance.get('/auth/verify?token=' + data)
        return res
    }

    passwordReset = async (data) => {
        const res = await this.instance.get(`/auth/password_reset_request?email=${data}`)
        return res
    }

    confirmPasswordReset = async (token: string) => {
        const res = await this.instance.get(`/auth/password_reset_confirmation?password_reset_token=${token}`)
        return res
    }

    passwordResetEmail = async (data) => {
        console.log('email data', data)
        const res = await this.instance.post('/auth/password_reset_email', {
            email: data.email,
            password: data.password.trim()
        })
        return res
    }

    uploadProfileImage = async (data: any) => {
        try {
            const res = await this.instance2.post('/auth/upload', data)
            console.log('upload', res)
            return res.data.client
        } catch (error) {
            console.log(error)
        }
    }


    //WALLET apis

    getWallet = async () => {
        const res = await this.instance.get('/api/v1/wallet/get')
        const response = res.data
        if (response.success == true) {
            return {
                wallet: response.wallet,
                message: response.message
            }
        }
        return {
            error: true,
            message: response.message
        }
    }

    fundWallet = async (data: any) => {
        const res = await this.instance.post('/api/v1/transfer/fund', {
            amount: data.amount,
            narration: data.narration,
            processor: data.processor,
            processor_reference: data.processor_reference,
            transaction_status: data.transaction_status
        })
        if (res.data.success == true) {
            return {
                wallet: res.data.data,
                message: res.data.message
            }
        }
        return {
            error: true,
            message: res.data.message
        }

    }


    setTransactionPin = async (data: any) => {
        const walletRes = await this.instance.post('/api/v1/wallet/activation', data)
        const response = walletRes.data
        if (response.success == true) {
            return {
                message: response.message,
                wallet: response.data
            }
        }
    }

    //Transaction apis

    getTransactions = async () => {
        const transactions = await this.instance.get('/api/v1/transaction/all')
        const response = transactions.data
        if (response.success == true) {
            return {
                transactions: response.data,
                message: response.message
            }
        }
        return {
            error: true,
            message: response.message
        }
    }
    transferFunds = async (data: any) => {
        const res = await this.instance.post('/api/v1/transfer', { ...data })
        if (res.data.success == true) {
            return {
                amount: res.data.amount,
                message: res.data.message
            }
        }
        return {
            error: true,
            message: res.data.message
        }
    }
}



