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
