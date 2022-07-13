import {combineReducers} from 'redux';
import hotels from './hotels';
import locations from './locations';
import login from './login';
import explore from './explore';

export default combineReducers({
  location: locations,
  hotel: hotels,
  login,
  explore,
});
