const FormReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_MAIN':
      return {
        ...state,
        [action.label]: action.value,
      };
    case 'ADD_ENTRY':
      return {
        ...state,
        [action.placeholder]: [
          ...state[action.placeholder],
          action.value,
        ],
      };
    case 'ADD_PASSAGE':
      return {
        ...state,
        passage: action.value,
      };

    case 'EDIT_ENTRY':
      return {
        ...state,
        [action.key]: state[action.key].map((el, idx) =>
          idx === action.entryIdx ? action.value : el,
        ),
      };
    case 'REMOVE_ENTRY':
      return {
        ...state,
        [action.key]: state[action.key].filter(
          (el, idx) => idx !== action.entryIdx,
        ),
      };
    case 'RESET':
      return action.resetForm(action.payload);

    default:
      return state;
  }
};

export default FormReducer;
