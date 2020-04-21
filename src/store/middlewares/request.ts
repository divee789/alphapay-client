import APIRequest from '../../services/api-services';
import { Storage } from '../../services/storage-services';
import { authConstants } from '../actions/actionTypes';

const apiRequest = new APIRequest();

export default function requestMiddleware() {
  return ({ dispatch, getState }) => (next) => async (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    next(action); // Start the loader anyways
    const token = Storage.checkAuthentication();
    //Check for existence of token
    if (token !== false) {
      const expired = apiRequest.isTokenExpired(token);
      //check if token is not expired
      if (!expired) {
        console.log('not expired token');
        return true;
      } else {
        //If token is expired return false
        console.log('expired token');
        try {
          await apiRequest.refresh(Storage.getRefreshToken());
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
