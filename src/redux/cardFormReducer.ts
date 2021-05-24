type FormAction = {
  type?: string;
  value?: string;
  placeholder?: CardDataKeys;
  label?: string;
  key?: string;
  entryIdx?: number;
  resetForm?: () => () => CardDataType;
};

// FIXME: remove any and correctly type CardDataType to allow the spread operator
const FormReducer = (
  state: CardDataType | any,
  action: FormAction,
) => {
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
        [action.key]: state[
          action.key
        ].map((el: string, idx: number) =>
          idx === action.entryIdx ? action.value : el,
        ),
      };
    case 'REMOVE_ENTRY':
      return {
        ...state,
        [action.key]: state[action.key].filter(
          (el: string, idx: number) => idx !== action.entryIdx,
        ),
      };
    case 'RESET':
      return action.resetForm();

    default:
      return state;
  }
};

export default FormReducer;