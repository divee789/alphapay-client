/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, { AxiosInstance } from 'axios';
import { Logger } from '../utils';
import { Storage } from '../services/storage-services';
import APIServiceError from './error-services';
import decode from 'jwt-decode';
import { Client } from '../store/types';

const APIBaseURL =
  process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_STAGING : process.env.REACT_APP_SERVER_URL;

export default class APIRequest {
  public instance: AxiosInstance;
  public instance2: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: APIBaseURL,
      timeout: 50000,
      headers: {
        Accept: 'application/json',
      },
    });
    this.instance2 = axios.create({
      baseURL: APIBaseURL,
      timeout: 50000,
      headers: {
        Accept: 'multipart/form-data',
      },
    });

    this.instance.interceptors.request.use(this.config, (error) => {
      Logger.error('Request Error: ', error);
      return Promise.reject(error);
    });

    this.instance.interceptors.response.use((response) => {
      Logger.info('Response: ', response.config.method, response.config.url, response.status);
      return response;
    }, this.configError);

    this.instance2.interceptors.request.use(this.config, (error) => {
      Logger.error('Request Error: ', error);
      return Promise.reject(error);
    });

    this.instance2.interceptors.response.use((response) => {
      Logger.info('Response: ', response.config.method, response.config.url, response.status);
      return response;
    }, this.configError);
    this.checkAuthToken();
  }

  config = (config) => {
    const altCopy = config;
    const userToken = this.setAuthorization();
    altCopy.headers = { ...config.headers, Authorization: userToken };

    Logger.info('Request: ', altCopy.url);
    return altCopy;
  };

  configError = (error) => {
    if (!error.response) {
      Logger.error('Response: ', 'Network Error');
      return Promise.reject(
        new APIServiceError({
          status: 500,
          data: {
            message: 'Network Error, try again',
            error: 'server_error',
            data: null,
          },
        }),
      );
    }
    Logger.warn('Response: ', error.response);
    return Promise.reject(new APIServiceError(error.response));
  };

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

  isloggedIn = async () => {
    const token = Storage.checkAuthentication();
    //Check for existence of token
    if (token) {
      const expired = this.isTokenExpired(token);
      //check if token is not expired
      if (!expired) {
        return true;
      } else {
        const refreshToken = Storage.getRefreshToken();
        if (refreshToken) {
          const expiredRefresh = this.isTokenExpired(refreshToken);
          if (!expiredRefresh) {
            await this.refresh(refreshToken);
            return true;
          }
        }
      }
    }
    return false;
  };

  isTokenExpired = (token: string) => {
    try {
      const decoded: { exp: number } = decode(token);
      const exp: number = decoded.exp;
      const refreshThreshold = Math.floor((new Date().getTime() + 120000) / 1000);
      if (exp < refreshThreshold) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  setAuthorization = () => {
    const userToken = Storage.getItem('userToken');
    // Check if user if authenticated if not return client token
    if (userToken) {
      return `Bearer ${userToken}`;
    }

    return null;
  };

  storeUserToken = (token: string, refreshToken: string) => {
    Storage.setItem('userToken', token);
    Storage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('logged', 'true');
  };

  activateTwoFa = async () => {
    const check = await this.isloggedIn();
    if (!check) {
      return {
        error: true,
        message: 'Your session has expired, please log in again',
      };
    }
    const response = await this.instance.get('/auth/2fa/generate');
    return response.data;
  };

  deactivate2FA = async () => {
    const check = await this.isloggedIn();
    if (!check) {
      return {
        error: true,
        message: 'Your session has expired, please log in again',
      };
    }
    const response = await this.instance.delete('/auth/2fa/deactivate');
    return response.data;
  };

  twoFaAuthorize = async (data: { email: string; token: string }) => {
    const response = await this.instance.post('/auth/2fa/verify', data);
    this.storeUserToken(response.data.data.access_token, response.data.data.refresh_token);
    return response.data;
  };

  logIn = async (data: { email: string; password: string }) => {
    const response = await this.instance.post('/auth/login', data);
    if (response.data.success === false && response.data.message === '2FA required') {
      return response.data;
    }
    this.storeUserToken(response.data.data.access_token, response.data.data.refresh_token);
    return response.data;
  };

  signUp = async (data: Client) => {
    const body = {
      ...data,
    };
    const response = await this.instance.post('/auth/signup', body);
    const authResponse = response.data;
    this.storeUserToken(authResponse.data.access_token, authResponse.data.refresh_token);
    const profileResponse = authResponse.data.client;
    return { ...authResponse, client: profileResponse };
  };

  refresh = async (refresh_token: string) => {
    const body = {
      refresh_token,
    };
    const response = await this.instance.post('/auth/client/token', body);
    const authResponse = response.data;
    Storage.setItem('userToken', authResponse.access_token);
    this.setHeader(authResponse.access_token);
    return authResponse;
  };

  update = async (data: Client) => {
    const body = {
      ...data,
    };
    const response = await this.instance.patch('/auth/update', body);
    if (response.data.success) {
      return {
        client: response.data.data,
        message: response.data.message,
      };
    }
    return {
      error: true,
      message: response.data.message,
    };
  };

  changePassword = async (data) => {
    const check = await this.isloggedIn();
    if (!check) {
      return {
        error: true,
        message: 'Your session has expired, please log in again',
      };
    }
    const body = {
      ...data,
    };
    const response = await this.instance.patch('/auth/password', body);
    if (response.data.success) {
      return {
        message: response.data.message,
      };
    }
    return {
      error: true,
      message: response.data.message,
    };
  };

  logOut = async (client_email?: string) => {
    const refresh_token = Storage.getItem('refreshToken');
    Storage.removeItem('userToken');
    Storage.removeItem('refreshToken');
    Storage.removeItem('userTokenExpiration');
    if (client_email) {
      await this.instance.post('/auth/logout', {
        client_email,
        refresh_token,
      });
    }
    this.clearHeader();
  };

  getUser = async () => {
    const res = await this.instance.get('/auth/client');
    return res.data.data;
  };

  verifyEmail = async (token: string) => {
    const res = await this.instance.get('/auth/verify?token=' + token);
    return res.data;
  };

  sendEmail = async () => {
    const check = await this.isloggedIn();
    if (!check) {
      return {
        error: true,
        message: 'Your session has expired, please log in again',
      };
    }
    const res = await this.instance.post('/auth/send_email');
    return res.data;
  };

  passwordReset = async (data) => {
    const res = await this.instance.get(`/auth/password_reset_request?email=${data}`);
    return res.data;
  };

  confirmPasswordReset = async (token: string) => {
    const res = await this.instance.get(`/auth/password_reset_confirmation?password_reset_token=${token}`);
    return res.data;
  };

  passwordResetEmail = async (data: { email: string; password: string }) => {
    const res = await this.instance.post('/auth/password_reset_email', {
      email: data.email,
      password: data.password.trim(),
    });
    return res.data;
  };

  uploadProfileImage = async (data) => {
    const check = await this.isloggedIn();
    if (!check) {
      return {
        error: true,
        message: 'Your session has expired, please log in again',
      };
    }
    const res = await this.instance2.post('/auth/upload', data);
    return res.data.client;
  };

  //WALLET apis

  getWallet = async () => {
    const res = await this.instance.get('/api/v1/wallet/get');
    const response = res.data;
    if (response.success === true) {
      return {
        wallet: response.wallet,
        message: response.message,
      };
    }
    return {
      error: true,
      message: response.message,
    };
  };

  fundWallet = async (data: {
    amount: string;
    narration?: string;
    processor: string;
    processor_reference: string;
    transaction_status: string;
    pin: string;
  }) => {
    const res = await this.instance.post('/api/v1/transfer/fund', {
      amount: data.amount,
      narration: data.narration,
      processor: data.processor,
      processor_reference: data.processor_reference,
      transaction_status: data.transaction_status,
      pin: data.pin,
    });
    if (res.data.success === true) {
      return {
        wallet: res.data.data,
        message: res.data.message,
      };
    }
    return {
      error: true,
      message: res.data.message,
    };
  };

  checkoutWallet = async (data) => {
    const res = await this.instance.post('/api/v1/transfer/withdraw', data);

    if (res.data.success === true) {
      return {
        wallet: res.data.data,
        message: res.data.message,
      };
    }
    return {
      error: true,
      message: res.data.message,
    };
  };

  getBanks = async () => {
    const check = await this.isloggedIn();
    if (!check) {
      return {
        error: true,
        message: 'Your session has expired, please log in again',
      };
    }
    const res = await this.instance.get('/api/v1/transfer/banks');
    if (res.data.success === true) {
      return {
        banks: res.data.data,
      };
    }
    return {
      error: true,
      message: res.data.message,
    };
  };

  confirmBankAccount = async (data: { bank: string; account: string }) => {
    const check = await this.isloggedIn();
    if (!check) {
      return {
        error: true,
        message: 'Your session has expired, please log in again',
      };
    }
    const res = await this.instance.post('/api/v1/transfer/banks/verify', data);
    return res.data;
  };

  transferFunds = async (data) => {
    const res = await this.instance.post('/api/v1/transfer', data);
    if (res.data.success === true) {
      return {
        amount: res.data.amount,
        message: res.data.message,
        wallet: res.data.client_wallet,
      };
    }
    return {
      error: true,
      message: res.data.message,
    };
  };

  //NOTIFICATIONS

  makeNotifications = async (data) => {
    const check = await this.isloggedIn();
    if (!check) {
      return {
        error: true,
        message: 'Your session has expired, please log in again',
      };
    }
    const res = await this.instance.post('/api/v1/transfer/notifications', data);
    if (res.data.success === true) {
      return {
        message: res.data.message,
      };
    }
    return {
      error: true,
      message: res.data.message,
    };
  };

  getNotifications = async () => {
    const check = await this.isloggedIn();
    if (!check) {
      return {
        error: true,
        message: 'Your session has expired, please log in again',
      };
    }
    const res = await this.instance.get('/api/v1/transfer/notifications');
    if (res.data.success === true) {
      return {
        notifications: res.data.notifications,
        message: res.data.message,
      };
    }
    return {
      error: true,
      message: res.data.message,
    };
  };

  deleteNotification = async (id) => {
    const check = await this.isloggedIn();
    if (!check) {
      return {
        error: true,
        message: 'Your session has expired, please log in again',
      };
    }
    const res = await this.instance.delete('/api/v1/transfer/notifications/' + id);
    if (res.data.success === true) {
      return {
        message: res.data.message,
      };
    }
    return {
      error: true,
      message: res.data.message,
    };
  };

  //Transaction apis

  getTransactions = async (page?: number) => {
    const transactions = await this.instance.get('/api/v1/transaction/all?page=' + page);
    const response = transactions.data;
    if (response.success === true) {
      return {
        transactions: response.data,
        message: response.message,
        pager: response.pager,
      };
    }
    return {
      error: true,
      message: response.message,
    };
  };

  filterTransactions = async (data, page?: number) => {
    const transactions = await this.instance.post('/api/v1/transaction/filter?page=' + page, { ...data });
    const response = transactions.data;
    if (response.success === true) {
      return {
        transactions: response.data,
        message: response.message,
        pager: response.pager,
      };
    }
    return {
      error: true,
      message: response.message,
    };
  };

  setTransactionPin = async (data: { transaction_pin: string }): Promise<{ message: string; wallet? }> => {
    const body = {
      transaction_pin: data.transaction_pin,
    };
    const walletRes = await this.instance.post('/api/v1/wallet/activation', body);
    const response = walletRes.data;
    if (response.success === true) {
      return {
        message: response.message,
        wallet: response.data,
      };
    }
    return {
      message: 'There has been an error in setting your pin,please try again later or contact support',
    };
  };
}
