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
      return value;
    }
  }

  static setItem(item: string, itemValue: any) {
    let value = itemValue;
    if (typeof itemValue === 'object' && itemValue !== null) {
      value = JSON.stringify(itemValue);
    }
    sessionStorage.setItem(item, value);
  }

  static removeItem(item: string) {
    sessionStorage.removeItem(item);
  }

  static clearItems() {
    sessionStorage.clear();
  }
  static checkAuthentication() {
    const userToken = Storage.getItem('userToken');
    if (!userToken) {
      return false;
    }
    return userToken;
  }

  static getRefreshToken() {
    const refreshToken = Storage.getItem('refreshToken');
    if (!refreshToken) {
      return false;
    }
    return refreshToken;
  }

  static checkExpiration() {
    const userTokenExpiration = Storage.getItem('userTokenExpiration');
    return userTokenExpiration || null;
  }
}
