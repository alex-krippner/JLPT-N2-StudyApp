export const capitalizeFirstLetter = (string: string) => {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function capitalizeFirstWord(string: string) {
  return string
    .split(' ')
    .map((word, idx) =>
      idx === 0 ? capitalizeFirstLetter(word) : word,
    )
    .join(' ');
}

export const compareProps = function compareProps(
  prevProps: any,
  nextProps: any,
) {
  const prevCardDataKeys = Object.keys(prevProps.cardData);
  const comparePropsArray: any[] = [];

  prevCardDataKeys.forEach((k) => {
    const previousCardDataValue = prevProps.cardData[k];
    const nextCardDataValue = nextProps.cardData[k];

    // If the value of a cardData property is an array than compare each array element
    if (Array.isArray(previousCardDataValue)) {
      const arrayDeepEquality = nextCardDataValue.every(
        (el: any, idx: number) => {
          if (
            previousCardDataValue.length !== nextCardDataValue.length
          ) {
            return false;
          }
          return el === previousCardDataValue[idx];
        },
      );

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
