export const ACTION_LIGHT_THEME = 'LIGHT';
export const ACTION_DARK_THEME = 'DARK';
export const ACTION_SWITCH_THEME = 'SWITCH';

const LIGHT_THEME = 'lightTheme';
const DARK_THEME = 'darkTheme';

export default function filtersReducer(state = [], action) {

  switch (action.type) {
    case 1: {
      return { ...state, themeName: LIGHT_THEME }
    }
    case 2: {
      return { ...state, themeName: DARK_THEME }
    }
    case 3: {
      const newTheme = state.themeName !== DARK_THEME ? DARK_THEME : LIGHT_THEME;
      return { ...state, themeName: newTheme }
    }
    default:
      return state
  }
}
