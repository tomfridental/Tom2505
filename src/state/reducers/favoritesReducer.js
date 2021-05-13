export const ACTION_TOGGLE_FAVORITES = 'TOGGLE_FAVORITES';

export default function filtersReducer(state = [], action) {

  const { location, type } = action;

  switch (type) {
    case ACTION_TOGGLE_FAVORITES: {

      const isItemAlreadyAdded = state.find(item => item.Key === location.Key);

      let stateCopy = state.concat();
      if (isItemAlreadyAdded) {
        stateCopy = stateCopy.filter(item => item.Key !== location.Key)
      } else {
        stateCopy.push(location)
      }
      return stateCopy;
    }
    default:
      return state
  }
}
