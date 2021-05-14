export const ACTION_SWITCH_TEMP_UNIT = 'SWITCH_TEMP_UNIT';
export const ACTION_SWITCH_THEME = 'SWITCH_THEME';
export const UPDATE_SELECTED_LOCATION = 'UPDATE_SELECTED_LOCATION';

const HEROHO_THEME = 'heroloTheme';
const BLUE_THEME = 'blueTheme';

export const METRIC_UNIT = 'Metric';
export const IMPERIAL_UNIT = 'Imperial';

const defaultState = {
  tempUnit: METRIC_UNIT,
  themeName: HEROHO_THEME,
  selectedLocation: null
}

export default function filtersReducer(state = defaultState, action) {

  switch (action.type) {
    case ACTION_SWITCH_THEME: {
      const newTheme = state.themeName !== BLUE_THEME ? BLUE_THEME : HEROHO_THEME;
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
