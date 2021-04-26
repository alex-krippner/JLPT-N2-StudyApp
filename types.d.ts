declare module '*.png' {
  const value: any;
  export = value;
}
// Indexed Access Types or maps
interface CardDataBaseTypeMap {
  cardType: CardType;
  id: string;
  rating: null | number;
  'new entry'?: string;
}

interface KanjiCardData extends CardDataBaseTypeMap {
  単語例: string[];
  漢字: string;
  用例: string[];
  読み: string[];
}

interface VocabCardData extends CardDataBaseTypeMap {
  定義: string[];
  漢字: string[];
  用例: string[];
  語彙: string;
  語類: string[];
}

interface GrammarCardData extends CardDataBaseTypeMap {
  variations: string[];
  意味: string[];
  接続: string[];
  文法: string;
  用例: string[];
}

interface ReadingCardData extends CardDataBaseTypeMap {
  choices: string[];
  passage: string[];
  question: string[];
  solution: string[];
}

type CardDataType = KanjiCardData &
  VocabCardData &
  GrammarCardData &
  ReadingCardData;

type CardDataKeys =
  | keyof KanjiCardData
  | keyof VocabCardData
  | keyof GrammarCardData
  | keyof ReadingCardData;

type CardLabels = '語彙' | '文法' | '漢字';

type CardType = 'kanji' | 'vocab' | 'grammar' | 'reading';

type CardProps = {
  cardData: CardDataType;
  onRate: (
    label: string[] | string | number | null | (string & string[]),
    ratingIndex: number,
  ) => void;
  tabLabels: CardDataKeys[];
  label: CardLabels;
  cardType?: CardType;
};

type CardFormReducerData = {
  type: string;
  value: string;
  label: string;
};
