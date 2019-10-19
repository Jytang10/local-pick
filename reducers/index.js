import { combineReducers } from 'redux';
import SearchReducer from './SearchReducer';
import LoadingReducer from './LoadingReducer';
import ListsReducer from './ListsReducer';
import LocationReducer from './LoadingReducer';
import NotesReducer from './NotesReducer';

const rootReducer = combineReducers({
  searchList: SearchReducer,
  loadingReducer: LoadingReducer,
  listsList: ListsReducer,
  locationsList: LocationReducer,
  notesList: NotesReducer
})

export default rootReducer;