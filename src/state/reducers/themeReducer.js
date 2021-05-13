export const ACTION_LIGHT_THEME = 'LIGHT';
export const ACTION_DARK_THEME = 'DARK';
export const ACTION_SWITCH_THEME = 'SWITCH';

const LIGHT_THEME = 'lightTheme';
const DARK_THEME = 'darkTheme';

export default function filtersReducer(state = { themeName: LIGHT_THEME }, action) {
  
  switch (action.type) {
    case ACTION_LIGHT_THEME: {
      return { ...state, themeName: LIGHT_THEME }
    }
    case ACTION_DARK_THEME: {
      return { ...state, themeName: DARK_THEME }
    }
    case ACTION_SWITCH_THEME: {
      const newTheme = state.themeName !== DARK_THEME ? DARK_THEME : LIGHT_THEME;
      return { ...state, themeName: newTheme }
    }
    default:
      return state
  }
}
