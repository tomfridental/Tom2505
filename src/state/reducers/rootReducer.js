import { combineReducers } from 'redux';
import ConfigReducer from './configReducer';
import FavoritesReducer from './favoritesReducer';



const rootReducer = combineReducers({
  config: ConfigReducer,
  favorites: FavoritesReducer
})

export default rootReducer