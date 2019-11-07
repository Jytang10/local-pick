import { combineReducers } from 'redux';
import SearchReducer from './SearchReducer';
import LoadingReducer from './LoadingReducer';
import ListsReducer from './ListsReducer';
import LocationsReducer from './LocationsReducer';
import NotesReducer from './NotesReducer';
import LoginReducer from './LoginReducer';

const rootReducer = combineReducers({
  searchList: SearchReducer,
  loadingReducer: LoadingReducer,
  listsList: ListsReducer,
  locationsList: LocationsReducer,
  notesList: NotesReducer,
  loginReducer: LoginReducer,
})

export default rootReducer;