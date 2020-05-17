import APIRequest from '../../services/api-services';
import { Storage } from '../../services/storage-services';
import { authConstants } from '../actions/actionTypes';

const apiRequest = new APIRequest();

export default function requestMiddleware() {
  return ({ dispatch, getState }) => (next) => async (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    next(action);
    //Check for existence of token
    const token = Storage.checkAuthentication();
    if (token) {
      //check if token is not expired
      const expired = apiRequest.isTokenExpired(token);

      if (expired) {
        try {
          //check if refresh token is expired
          const refreshToken = Storage.getRefreshToken();
          if (refreshToken) {
            const refExpired = apiRequest.isTokenExpired(refreshToken);
            if (refExpired) {
              return apiRequest.logOut();
            }
            await apiRequest.refresh(refreshToken);
            return;
          }
          return apiRequest.logOut();
        } catch (error) {
          console.log('midleware error', error);
          apiRequest.logOut();
          dispatch({ type: authConstants.LOGOUT });
          throw error;
        }
      }
    }

    return { apiRequest };
  };
}
