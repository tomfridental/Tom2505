export const ACTION_SWITCH_TEMP_UNIT = 'SWITCH_TEMP_UNIT';
export const ACTION_SWITCH_THEME = 'SWITCH_THEME';
export const UPDATE_SELECTED_LOCATION = 'UPDATE_SELECTED_LOCATION';

const PURPLE_THEME = 'purpleTheme';
const BLUE_THEME = 'blueTheme';

const defaultState = {
  themeName: PURPLE_THEME,
  selectedLocation: null
}

export default function filtersReducer(state = defaultState, action) {

  switch (action.type) {
    case ACTION_SWITCH_THEME: {
      const newTheme = state.themeName !== BLUE_THEME ? BLUE_THEME : PURPLE_THEME;
      return { ...state, themeName: newTheme }
    }
    case ACTION_SWITCH_TEMP_UNIT: {
      const newUnit = state.tempUnit !== METRIC_UNIT ? METRIC_UNIT : IMPERIAL_UNIT;
      return { ...state, tempUnit: newUnit }
    }
    case UPDATE_SELECTED_LOCATION: {
      return { ...state, selectedLocation: action.location }
    }
    default:
      return state
  }
}
