export const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function capitalizeFirstWord(string) {
  return string
    .split(' ')
    .map((word, idx) =>
      idx === 0 ? capitalizeFirstLetter(word) : word,
    )
    .join(' ');
}

export const initCardFormProperties = function initCardFormProperties(
  d,
  key,
  label,
) {
  switch (key) {
    case 'rating':
      return {
        ...d,
        rating: 0,
      };
    case 'id':
      return {
        ...d,
        id: '',
      };
    case label:
      return {
        ...d,
        [label]: '',
      };
    case 'cardType':
      return {
        ...d,
        cardType: '',
      };
    case 'passage':
      return {
        ...d,
        passage: '',
      };
    default:
      return {
        ...d,
        [key]: [],
      };
  }
};
