export const initCardFormProperties = function initCardFormProperties(
  d: any,
  key: any,
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
    case 'mainContent':
      return {
        ...d,
        mainContent: '',
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

export const initCardForm = (editing?: boolean, cardData?: any) => {
  let initState;
  // CREATE CARD FORM OBJECT WITH CARD DATA OF CURRENTLY EDITING CARD
  if (editing) initState = cardData;

  // CREATE A CARD FORM OBJECT WITH EMPTY DEFAULT VALUES
  // THE FIRST ELEMENT OF THE cardData IS USED AS A TEMPLATE
  if (!editing && Array.isArray(cardData))
    initState = Object.keys(cardData[0]).reduce(
      (d, key) => initCardFormProperties(d, key),
      {},
    );
  return initState;
};
