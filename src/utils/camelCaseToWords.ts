export function camelCaseToWords(camelCaseString: string): string {
  // Use a regular expression to split the string at every capital letter
  const words = camelCaseString.split(/(?=[A-Z])/);
  // Return early with a single capitalized word
  if (words.length === 1) return words[0][0].toUpperCase() + words[0].slice(1);
  // Capitalize the first word and convert the rest to lowercase
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].toLowerCase();
  }

  return words.join(" ");
}
