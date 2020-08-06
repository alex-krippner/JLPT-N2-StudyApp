const KANJI_DATA = [
  {
    kanji: '濯',
    id: 1,
    reading: ['タク'],
    wordSample: ['洗濯'],
    sentenceSample: ['洗濯物を出す'],
  },
  {
    kanji: '燥',
    id: 2,
    reading: ['ソウ'],
    wordSample: ['乾燥'],
    sentenceSample: ['乾燥注意報が出ている'],
  },

  {
    kanji: '司',
    id: 3,
    reading: [' シ'],
    wordSample: ['司会'],
    sentenceSample: ['彼女は結婚式の司会の仕事をしている'],
  },

  {
    kanji: '紹',
    id: 4,
    reading: ['ショウ'],
    wordSample: ['紹介'],
    sentenceSample: ['友だちを紹介します'],
  },

  {
    kanji: '独',
    id: 5,
    reading: ['ドク', 'ひと・り'],
    wordSample: ['紹介', '独立', '独身', '独り言'],
    sentenceSample: ['独立記念日', '今は独身です', '独り言を言う　'],
  },

  {
    kanji: ' 香',
    id: 6,
    reading: ['コウ', 'かお・り'],
    wordSample: ['香水', '香り'],
    sentenceSample: ['香水をつける', '　バラの香りがする'],
  },

  {
    kanji: '貯',
    id: 7,
    reading: ['チョ'],
    wordSample: ['貯金', '貯蔵'],
    sentenceSample: ['貯金ほとんどない', '食料を貯蔵する倉庫'],
  },

  {
    kanji: '  価',
    id: 8,
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
    id: 9,
    reading: ['カン'],
    wordSample: ['看病', '看板'],
    sentenceSample: ['看病のおかげでよくなりました', '看板を見る'],
  },
  {
    kanji: '  吹',
    id: 10,
    reading: ['ふ・く'],
    wordSample: ['吹く'],
    sentenceSample: ['風が吹く'],
  },
  {
    kanji: '  液',
    id: 11,
    reading: ['エキ'],
    wordSample: ['血液', '液体'],
    sentenceSample: ['血液検査をする', '液体と固体'],
  },
  {
    kanji: '傾',
    id: 12,
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
