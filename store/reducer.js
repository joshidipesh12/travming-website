import {combineReducers} from 'redux';
import hotels from './hotels';
import locations from './locations';

export default combineReducers({
  location: locations,
  hotel: hotels,
});
