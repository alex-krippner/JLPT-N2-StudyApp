type BemScope = [
  (modifierName?: string) => string,
  (elementName: string, modifierName?: string) => string,
];

function bemClassNameFor(prefix: string, modifierName?: string): string {
  const suffix = modifierName ? ` ${prefix}--${modifierName}` : "";
  return `${prefix}${suffix}`;
}

export function bem(block: string): BemScope {
  return [
    (modifierName?: string) => {
      return bemClassNameFor(block, modifierName);
    },
    (elementName: string, modifierName?: string) => {
      return bemClassNameFor(`${block}__${elementName}`, modifierName);
    },
  ];
}
