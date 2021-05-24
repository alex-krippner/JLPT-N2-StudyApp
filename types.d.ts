declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.svg' {
  const value: any;
  export = value;
}
// Indexed Access Types or maps
interface CardDataBaseDefinition {
  id: string;
  mainContent: string;
  rating: null | number;
  'new entry'?: string;
}

interface KanjiCardData extends CardDataBaseDefinition {
  cardType: 'kanji' | string;
  単語例: string[];
  漢字: string;
  用例: string[];
  読み: string[];
}

interface VocabCardData extends CardDataBaseDefinition {
  cardType: 'vocab' | string;
  定義: string[];
  漢字: string[];
  用例: string[];
  語彙: string;
  語類: string[];
}

interface GrammarCardData extends CardDataBaseDefinition {
  cardType: 'grammar' | string;
  variations: string[];
  意味: string[];
  接続: string[];
  文法: string;
  用例: string[];
}

interface ReadingCardData
  extends Omit<CardDataBaseDefinition, 'mainContent'> {
  cardType: 'reading' | string;
  choices: string[];
  passage: string[];
  question: string[];
  solution: string[];
}

type CardDataType =
  | KanjiCardData
  | VocabCardData
  | GrammarCardData
  | ReadingCardData;

type CardDataKeys =
  | keyof KanjiCardData
  | keyof VocabCardData
  | keyof GrammarCardData
  | keyof ReadingCardData;

type CardLabels = '語彙' | '文法' | '漢字' | 'reading';

type KanjiTabLabels = '読み' | '単語例' | '用例';

type VocabTabLabels = '漢字' | '語類' | '定義' | '用例';

type GrammarTabLabels = 'variations' | '意味' | '接続' | '用例';

type TabLabel =
  | '単語例'
  | '読み'
  | '定義'
  | '漢字'
  | '用例'
  | '語彙'
  | '語類'
  | 'variations'
  | '意味'
  | '接続'
  | 'question'
  | 'solution'
  | 'choices'
  | 'passage';

type CardType = string | 'kanji' | 'vocab' | 'grammar' | 'reading';

interface CardProps<T, K> {
  cardData: T;
  onRate: (
    label: string[] | string | number | null | (string & string[]),
    ratingIndex: number,
  ) => void;
  tabLabels: K[];
  label: CardLabels;
  cardType?: CardType;
}

type CardFormReducerData = {
  type: string;
  value: string;
  label: string;
};

type StyledProps = {
  top?: string;
  left?: string;
  width?: string;
  height?: string;
  display?: string;
  fxDirection?: string;
  borderRadius?: string;
  bgColor?: string;
  border?: string;
  boxShadow?: string;
  transform?: string;
  cursor?: string;
  position?: string;
  cardType?: string;
  front?: boolean | string;
  back?: boolean | string;
  fontSize?: string;
  grammar?: boolean;
  section?: number;
  labelNum?: number;
  blur?: boolean;
  tabLabel?: string;
  visible?: boolean;
  perspective?: string;
};
