import APIRequest from '../../services/api-services';
import { Storage } from '../../services/storage-services';
import { authConstants } from '../actions/actionTypes';

const apiRequest = new APIRequest();

export default function requestMiddleware() {
  return ({ dispatch, getState }) => (next) => async (action): Promise<any> => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    next(action);
    const token = Storage.checkAuthentication();
    if (token) {
      const expired = apiRequest.isTokenExpired(token);
      if (expired) {
        try {
          const refreshToken = Storage.getRefreshToken();
          if (refreshToken) {
            const refExpired = apiRequest.isTokenExpired(refreshToken);
            if (refExpired) {
              dispatch({ type: authConstants.LOGOUT });
              return apiRequest.logOut();
            }
            await apiRequest.refresh(refreshToken);
            return;
          }
          dispatch({ type: authConstants.LOGOUT });
          return apiRequest.logOut();
        } catch (error) {
          apiRequest.logOut();
          dispatch({ type: authConstants.LOGOUT });
          throw error;
        }
      }
    }

    return { apiRequest };
  };
}
