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

export const initCardForm = (editing, cardData, label) => {
  let initState;

  // CREATE CARD FORM OBJECT WITH CARD DATA OF CURRENTLY EDITING CARD
  if (editing) initState = cardData;

  // CREATE AN CARD FORM OBJECT WITH EMPTY DEFAULT VALUES
  // THE FIRST ELEMENT OF THE cardData IS USED AS A TEMPLATE
  if (!editing)
    initState = Object.keys(cardData[0]).reduce(
      (d, key) => initCardFormProperties(d, key, label),
      {},
    );

  return initState;
};

export const compareProps = function compareProps(
  prevProps,
  nextProps,
) {
  const prevCardDataKeys = Object.keys(prevProps.cardData);
  const comparePropsArray = [];

  prevCardDataKeys.forEach((k) => {
    const previousCardDataValue = prevProps.cardData[k];
    const nextCardDataValue = nextProps.cardData[k];

    // If the value of a cardData property is an array than compare each array element
    if (Array.isArray(previousCardDataValue)) {
      const arrayDeepEquality = nextCardDataValue.every((el, idx) => {
        if (
          previousCardDataValue.length !== nextCardDataValue.length
        ) {
          return false;
        }
        return el === previousCardDataValue[idx];
      });

      comparePropsArray.push(arrayDeepEquality);
      return;
    }

    // If the object value is not an array simply compare the previous and new values
    comparePropsArray.push(
      previousCardDataValue === nextCardDataValue,
    );
  });

  return comparePropsArray.every((e) => e === true);
};
