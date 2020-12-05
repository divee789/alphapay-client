/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, { AxiosInstance } from 'axios';
import { Logger, history } from '../utils';
import { Storage } from '../services/storage-services';
import APIServiceError from './error-services';
import decode from 'jwt-decode';
import { User } from '../store/types';
import store from '../store';

const APIBaseURL =
  process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_STAGING : process.env.REACT_APP_SERVER_URL;

export default class APIService {
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
            message: 'Network Error, Try Again',
            error: 'server_error',
            data: null,
          },
        }),
      );
    }
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === `${APIBaseURL}/auth/user/token`) {
      store.dispatch({ type: 'LOGOUT' });
      Storage.clearItems();
      history.push('/login');
      return Promise.reject(new APIServiceError(error.response));
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return this.refresh(Storage.getRefreshToken())
        .then(() => this.instance(originalRequest))
        .catch((err) => Promise.reject(new APIServiceError(err.response)));
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
      if (!expired) {
        return true;
      } else {
        const refreshToken = Storage.getRefreshToken();
        if (refreshToken) {
          const expiredRefresh = this.isTokenExpired(refreshToken);
          if (!expiredRefresh) {
            await this.refresh(refreshToken)
              .then(() => true)
              .catch(() => false);
          }
          return false;
        }
      }
    }
    return false;
  };

  isTokenExpired = (token: string) => {
    try {
      const decoded: { exp: number } = decode(token);
      const exp: number = decoded.exp;
      // Refresh the token a minute early to avoid latency issues
      const expirationTime = exp * 1000 - 60000;
      if (Date.now() >= expirationTime) {
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
    // Check if user if authenticated if not return user token
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
    const response = await this.instance.get('/auth/2fa/generate');
    return response.data;
  };

  deactivate2FA = async () => {
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
    return response.data.data;
  };

  signUp = async (data: User) => {
    const response = await this.instance.post('/auth/signup', data);
    const authResponse = response.data;
    this.storeUserToken(authResponse.data.access_token, authResponse.data.refresh_token);
    return authResponse.data;
  };

  refresh = async (refresh_token: string) => {
    const body = {
      refresh_token,
    };
    const response = await this.instance.post('/auth/user/token', body);
    const authResponse = response.data.data;
    Storage.setItem('userToken', authResponse.access_token);
    Storage.setItem('refreshToken', authResponse.refresh_token);
    this.setHeader(authResponse.access_token);
    return authResponse;
  };

  update = async (data: User) => {
    const response = await this.instance.patch('/auth/update', data);
    return response.data.data;
  };

  changePassword = async (data) => {
    const response = await this.instance.patch('/auth/password', data);
    return response.data.data;
  };

  logOut = async () => {
    Storage.removeItem('userToken');
    Storage.removeItem('refreshToken');
    Storage.removeItem('userTokenExpiration');
    this.clearHeader();
  };

  getUser = async () => {
    const res = await this.instance.get('/auth/user');
    return res.data.data;
  };

  verifyEmail = async (token: string) => {
    const res = await this.instance.get('/auth/verify?token=' + token);
    return res.data.data;
  };

  sendEmail = async () => {
    const res = await this.instance.post('/auth/send_email');
    return res.data.data;
  };

  passwordReset = async (data) => {
    const res = await this.instance.get(`/auth/password_reset_request?email=${data}`);
    return res.data.data;
  };

  confirmPasswordReset = async (token: string) => {
    const res = await this.instance.get(`/auth/password_reset_confirmation?password_reset_token=${token}`);
    return res.data.data;
  };

  passwordResetEmail = async (data: { email: string; password: string }) => {
    const res = await this.instance.post('/auth/password_reset_email', {
      email: data.email,
      password: data.password.trim(),
    });
    return res.data.data;
  };

  uploadProfileImage = async (data) => {
    const res = await this.instance2.post('/auth/upload', data);
    return res.data.data;
  };

  //WALLET apis

  getWallet = async () => {
    const res = await this.instance.get('/api/v1/wallet/get');
    return res.data.data;
  };

  getModalProcessor = async () => {
    const res = await this.instance.get('/api/v1/transfer/collection/processor');
    return res.data.data;
  };

  fundWallet = async (data: {
    amount: string;
    narration?: string;
    processor: string;
    processor_reference: string;
    transaction_status: string;
    pin: string;
  }) => {
    const res = await this.instance.post('/api/v1/transfer/fund', data);
    return res.data.data;
  };

  checkoutWallet = async (data) => {
    const res = await this.instance.post('/api/v1/transfer/withdraw', data);
    return res.data.data;
  };

  verifyTransaction = async (processor: string, transactionId: string) => {
    const res = await this.instance.get(`/api/v1/transfer/verify/${processor}/${transactionId}`);
    return res.data.data;
  };

  getBanks = async () => {
    const res = await this.instance.get('/api/v1/transfer/banks');
    return res.data.data;
  };

  confirmBankAccount = async (data: { bank: string; bank_account: string }) => {
    const res = await this.instance.post('/api/v1/transfer/banks/verify', data);
    console.log(res);
    return res.data.data;
  };

  transferFunds = async (data) => {
    const res = await this.instance.post('/api/v1/transfer', data);
    return res.data.data;
  };

  verifyRecipientAccount = async (phoneNumber) => {
    const res = await this.instance.get(`/api/v1/transfer/account?phone_number=${phoneNumber}`);
    return res.data.data;
  };

  //NOTIFICATIONS

  makeNotifications = async (data) => {
    const res = await this.instance.post('/api/v1/transfer/notifications', data);
    return res.data.data;
  };

  getNotifications = async () => {
    const res = await this.instance.get('/api/v1/transfer/notifications');
    return res.data.data;
  };

  deleteNotification = async (id) => {
    const res = await this.instance.delete('/api/v1/transfer/notifications/' + id);
    return res.data.data;
  };

  //Transaction apis

  getTransactions = async (page?: number) => {
    const response = await this.instance.get('/api/v1/transaction/all?page=' + page);
    return response.data.data;
  };

  setTransactionPin = async (data: { transaction_pin: string }): Promise<{ message: string; wallet? }> => {
    const body = {
      transaction_pin: data.transaction_pin,
    };
    const response = await this.instance.post('/api/v1/wallet/activation', body);
    return response.data.data;
  };

  // PAYMENT REQUEST APIs

  getPaymentRequests = async () => {
    const response = await this.instance.get('/api/v1/payment_request');
    return response.data.data;
  };

  createPaymentRequest = async (data) => {
    const response = await this.instance.post('/api/v1/payment_request', data);
    return response.data.data;
  };

  processPaymentRequest = async (status: string, paymentId: string) => {
    const response = await this.instance.put(`/api/v1/payment_request/${paymentId}`, { status });
    return response.data.data;
  };
}
