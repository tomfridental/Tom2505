import { combineReducers } from 'redux';
import ThemeReducer from './themeReducer';
import FavoritesReducer from './favoritesReducer';
// import UserPageReducer from './UserPage/UserPgaeReduer/UserPgae.reducer'
// import BottomReducer from './Bottom/BottomReducer/Bottom.reducer';



const rootReducer = combineReducers({
    theme: ThemeReducer,
    favorites: FavoritesReducer,
    // UserPageData: UserPageReducer,
    // bottomData: BottomReducer
   
  })
  
  export default rootReducer