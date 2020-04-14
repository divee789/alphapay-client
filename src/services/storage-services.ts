import { Logger } from '../utils/index';

export function IsJsonString(str: any) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export class Storage {
  static getItem(item: string) {
    const value = sessionStorage.getItem(item);
    if (value === undefined || value === null) {
      return null;
    }
    try {
      const parsedValue = JSON.parse(value);
      return parsedValue;
    } catch (error) {
      // log error
    }
    return value;
  }

  static setItem(item: string, itemValue: any) {
    try {
      let value = itemValue;
      if (typeof itemValue === 'object' && itemValue !== null) {
        value = JSON.stringify(itemValue);
      }
      sessionStorage.setItem(item, value);
    } catch (error) {
      Logger.error(error);
      // log error
    }
  }

  static removeItem(item: string) {
    try {
      sessionStorage.removeItem(item);
    } catch (error) {
      Logger.error(error);
    }
  }

  static clearItems() {
    try {
      sessionStorage.clear();
    } catch (error) {
      Logger.error(error);
    }
  }
  static checkAuthentication() {
    let userToken;
    try {
      userToken = Storage.getItem('userToken');
    } catch (error) {
      Logger.error(error);
      return false;
    }
    if (!userToken) {
      return false;
    }

    return userToken;
  }

  static getRefreshToken() {
    let refreshToken;
    try {
      refreshToken = Storage.getItem('refreshToken');
    } catch (error) {
      Logger.error(error);
      // log error
      return false;
    }
    return refreshToken;
  }

  static checkExpiration() {
    let userTokenExpiration;
    try {
      userTokenExpiration = Storage.getItem('userTokenExpiration');
    } catch (error) {
      Logger.error(error);
      return null;
    }
    return userTokenExpiration || null;
  }
}
