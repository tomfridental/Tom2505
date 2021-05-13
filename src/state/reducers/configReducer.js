export const ACTION_SWITCH_TEMP_UNIT = 'SWITCH_TEMP_UNIT';
export const ACTION_SWITCH_THEME = 'SWITCH_THEME';

const HEROHO_THEME = 'heroloTheme';
const BLUE_THEME = 'blueTheme';

export const METRIC_UNIT = 'Metric';
export const IMPERIAL_UNIT = 'Imperial';

export default function filtersReducer(state = { tempUnit: METRIC_UNIT, themeName: HEROHO_THEME }, action) {

  switch (action.type) {
    case ACTION_SWITCH_THEME: {
      const newTheme = state.themeName !== BLUE_THEME ? BLUE_THEME : HEROHO_THEME;
      return { ...state, themeName: newTheme }
    }
    case ACTION_SWITCH_TEMP_UNIT: {
      const newUnit = state.tempUnit !== METRIC_UNIT ? METRIC_UNIT : IMPERIAL_UNIT;
      return { ...state, tempUnit: newUnit }
    }
    default:
      return state
  }
}
