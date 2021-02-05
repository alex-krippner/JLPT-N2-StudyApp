import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

const KANJI_DATA = {
  濯: {
    cardType: 'kanji',
    漢字: '濯',
    id: uuidv4(),
    読み: ['タク'],
    単語例: ['洗濯'],
    用例: ['洗濯物を出す'],
    rating: 0,
  },
  燥: {
    cardType: 'kanji',
    漢字: '燥',
    id: uuidv4(),
    読み: ['ソウ'],
    単語例: ['乾燥'],
    用例: ['乾燥注意報が出ている'],
    rating: 0,
  },

  司: {
    cardType: 'kanji',
    漢字: '司',
    id: uuidv4(),
    読み: [' シ'],
    単語例: ['司会'],
    用例: ['彼女は結婚式の司会の仕事をしている'],
    rating: 0,
  },

  紹: {
    cardType: 'kanji',
    漢字: '紹',
    id: uuidv4(),
    読み: ['ショウ'],
    単語例: ['紹介'],
    用例: ['友だちを紹介します'],
    rating: 0,
  },

  独: {
    cardType: 'kanji',
    漢字: '独',
    id: uuidv4(),
    読み: ['ドク', 'ひと・り'],
    単語例: ['独立', '独身', '独り言'],
    用例: ['独立記念日', '今は独身です', '独り言を言う　'],
    rating: 0,
  },

  香: {
    cardType: 'kanji',
    漢字: '香',
    id: uuidv4(),
    読み: ['コウ', 'かお・り'],
    単語例: ['香水', '香り'],
    用例: ['香水をつける', 'バラの香りがする'],
    rating: 0,
  },

  貯: {
    cardType: 'kanji',
    漢字: '貯',
    id: uuidv4(),
    読み: ['チョ'],
    単語例: ['貯金', '貯蔵'],
    用例: ['貯金ほとんどない', '食料を貯蔵する倉庫'],
    rating: 0,
  },

  価: {
    cardType: 'kanji',
    漢字: '価',
    id: uuidv4(),
    読み: ['カ'],
    単語例: ['価値', '価格', '物価'],
    用例: ['勉強する価値がある', '価格が低い', '物価が高い'],
    rating: 0,
  },

  看: {
    cardType: 'kanji',
    漢字: '看',
    id: uuidv4(),
    読み: ['カン'],
    単語例: ['看病', '看板'],
    用例: ['看病のおかげでよくなりました', '看板を見る'],
    rating: 0,
  },
  吹: {
    cardType: 'kanji',
    漢字: '吹',
    id: uuidv4(),
    読み: ['ふ・く'],
    単語例: ['吹く'],
    用例: ['風が吹く'],
    rating: 0,
  },
  液: {
    cardType: 'kanji',
    漢字: '液',
    id: uuidv4(),
    読み: ['エキ'],
    単語例: ['血液', '液体'],
    用例: ['血液検査をする', '液体と固体'],
    rating: 0,
  },
  傾: {
    cardType: 'kanji',
    漢字: '傾',
    id: uuidv4(),
    読み: ['ケイ', 'かたむ・く'],
    単語例: ['傾向', '傾く'],
    用例: ['傾向と対策', 'この塔は傾いている'],
    rating: 0,
  },
};

const INITIAL_STATE = { ...KANJI_DATA };

const kanjiCollectionSlice = createSlice({
  name: 'kanjiCollection',
  initialState: INITIAL_STATE,
  reducers: {
    rateKanji(state, action) {
      return {
        ...state,
        [action.payload.kanji]: {
          ...state[action.payload.kanji],
          rating:
            action.payload.rating ===
            state[action.payload.kanji].rating
              ? state.rating - 1
              : action.payload.rating,
        },
      };
    },
    addKanji(state = {}, action) {
      return {
        ...state,
        [action.payload.漢字]: {
          cardType: 'kanji',
          漢字: action.payload.漢字,
          id: uuidv4(),
          読み: [...action.payload.読み],
          単語例: [...action.payload.単語例],
          用例: [...action.payload.用例],
          rating: 0,
        },
      };
    },
    editKanji(state, action) {
      return {
        ...state,
        [action.payload.漢字]: {
          ...action.payload,
        },
      };
    },
    deleteKanji(state, action) {
      const {
        [action.payload]: objectPropsToDelete,
        ...remainingState
      } = state;

      return remainingState;
    },
  },
});

export const {
  rateKanji,
  addKanji,
  editKanji,
  deleteKanji,
} = kanjiCollectionSlice.actions;

export default kanjiCollectionSlice.reducer;
