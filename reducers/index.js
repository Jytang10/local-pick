import { combineReducers } from 'redux';
import SearchReducer from './SearchReducer';
import LoadingReducer from './LoadingReducer';
import CategoriesReducer from './CategoriesReducer';
import LocationReducer from './LoadingReducer';
import NotesReducer from './NotesReducer';

const rootReducer = combineReducers({
  searchList: SearchReducer,
  loadingReducer: LoadingReducer,
  categoriesList: CategoriesReducer,
  locationsList: LocationReducer,
  notesList: NotesReducer
})

export default rootReducer;