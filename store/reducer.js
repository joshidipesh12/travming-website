import {combineReducers} from 'redux';
import hotels from './hotels';
import locations from './locations';
import login from './login';

export default combineReducers({
  location: locations,
  hotel: hotels,
  login,
});
