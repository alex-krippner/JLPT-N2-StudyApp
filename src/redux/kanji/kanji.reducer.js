import { v4 as uuidv4 } from 'uuid';

const KANJI_DATA = [
  {
    kanji: '濯',
    id: uuidv4(),
    reading: ['タク'],
    wordSample: ['洗濯'],
    sentenceSample: ['洗濯物を出す'],
  },
  {
    kanji: '燥',
    id: uuidv4(),
    reading: ['ソウ'],
    wordSample: ['乾燥'],
    sentenceSample: ['乾燥注意報が出ている'],
  },

  {
    kanji: '司',
    id: uuidv4(),
    reading: [' シ'],
    wordSample: ['司会'],
    sentenceSample: ['彼女は結婚式の司会の仕事をしている'],
  },

  {
    kanji: '紹',
    id: uuidv4(),
    reading: ['ショウ'],
    wordSample: ['紹介'],
    sentenceSample: ['友だちを紹介します'],
  },

  {
    kanji: '独',
    id: uuidv4(),
    reading: ['ドク', 'ひと・り'],
    wordSample: ['独立', '独身', '独り言'],
    sentenceSample: ['独立記念日', '今は独身です', '独り言を言う　'],
  },

  {
    kanji: ' 香',
    id: uuidv4(),
    reading: ['コウ', 'かお・り'],
    wordSample: ['香水', '香り'],
    sentenceSample: ['香水をつける', 'バラの香りがする'],
  },

  {
    kanji: '貯',
    id: uuidv4(),
    reading: ['チョ'],
    wordSample: ['貯金', '貯蔵'],
    sentenceSample: ['貯金ほとんどない', '食料を貯蔵する倉庫'],
  },

  {
    kanji: '  価',
    id: uuidv4(),
    reading: ['カ'],
    wordSample: ['価値', '価格', '物価'],
    sentenceSample: [
      '勉強する価値がある',
      '価格が低い',
      '物価が高い',
    ],
  },

  {
    kanji: ' 看',
    id: uuidv4(),
    reading: ['カン'],
    wordSample: ['看病', '看板'],
    sentenceSample: ['看病のおかげでよくなりました', '看板を見る'],
  },
  {
    kanji: '  吹',
    id: uuidv4(),
    reading: ['ふ・く'],
    wordSample: ['吹く'],
    sentenceSample: ['風が吹く'],
  },
  {
    kanji: '  液',
    id: uuidv4(),
    reading: ['エキ'],
    wordSample: ['血液', '液体'],
    sentenceSample: ['血液検査をする', '液体と固体'],
  },
  {
    kanji: '傾',
    id: uuidv4(),
    reading: ['ケイ', 'かたむ・く'],
    wordSample: ['傾向', '傾く'],
    sentenceSample: ['傾向と対策', 'この塔は傾いている'],
  },
];

const INITIAL_STATE = {
  kanji: KANJI_DATA,
};

const kanjiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default kanjiReducer;
