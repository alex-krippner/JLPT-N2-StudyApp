declare module '*.png' {
  const value: any;
  export = value;
}

interface CardData {
  cardType: string;
  id: string;
  rating: null | number;
  'new entry'?: string;
}

interface KanjiCardData extends CardData {
  単語例: string[];
  漢字: string;
  用例: string[];
  読み: string[];
}

interface VocabCardData extends CardData {
  定義: string[];
  漢字: string[];
  用例: string[];
  語彙: string;
  語類: string[];
}

interface GrammarCardData extends CardData {
  variations: string[];
  意味: string[];
  接続: string[];
  文法: string;
  用例: string[];
}

interface ReadingCardData extends CardData {
  choices: string[];
  passage: string[];
  question: string[];
  solution: string[];
}
