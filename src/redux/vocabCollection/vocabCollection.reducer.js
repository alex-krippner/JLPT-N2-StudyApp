import { v4 as uuidv4 } from 'uuid';

import VocabCollectionActionTypes from './vocabCollection.actionTypes';
import vocabReducer from '../vocab/vocab.reducer';
import { deleteCard } from '../utils';

const VOCAB_DATA = {
  あっ: {
    cardType: 'vocab',
    id: uuidv4(),
    語彙: 'あっ',
    漢字: ['No Kanji Provided'],
    語類: ['int'],
    定義: ['ah', 'oh'],
    用例: ['あ！まずい！ガソリンが切れてきた'],
    rating: 0,
  },
  ああ: {
    cardType: 'vocab',
    id: uuidv4(),
    語彙: 'ああ',
    漢字: ['No Kanji Provided'],
    語類: ['adv'],
    定義: ['like that', 'that way'],
    用例: ['ある人はこうだと言い、またある人はああだと言う'],
    rating: 0,
  },
  あい: {
    cardType: 'vocab',
    id: uuidv4(),
    語彙: 'あい',
    漢字: ['愛'],
    語類: ['n,n-suf'],
    定義: ['love', 'affection', 'care'],
    用例: ['愛の動きは不可解'],
    rating: 0,
  },
  あいかわらず: {
    cardType: 'vocab',
    id: uuidv4(),
    語彙: 'あいかわらず',
    漢字: ['相変わらず'],
    語類: ['adv,adj-no'],
    定義: ['as ever', 'as usual', 'the same'],
    用例: ['君は相変わらず健康そうに見える'],
    rating: 0,
  },
  あいさつ: {
    cardType: 'vocab',
    id: uuidv4(),
    語彙: 'あいさつ',
    漢字: ['挨拶'],
    語類: ['n,vs,adj-no'],
    定義: [
      'greeting',
      'polite set phrase used to express apology, sympathy, congratulations',
    ],
    用例: [
      '彼女はにっこり挨拶をした。',
      'この場をお借りして一言挨拶を申し上げます',
    ],
    rating: 0,
  },
  あいじょう: {
    cardType: 'vocab',
    id: uuidv4(),
    語彙: 'あいじょう',
    漢字: ['愛情'],
    語類: ['n,adj-no'],
    定義: ['love', 'affection'],
    用例: ['とりわけ子供たちは愛情を必要とする。'],
    rating: 0,
  },
  あいず: {
    cardType: 'vocab',
    id: uuidv4(),
    語彙: 'あいず',
    漢字: ['合図'],
    語類: ['n,vs'],
    定義: ['sign', 'signal'],
    用例: ['すぐにゴーの合図をしてください。'],
    rating: 0,
  },
  あいする: {
    cardType: 'vocab',
    id: uuidv4(),
    語彙: 'あいする',
    漢字: ['愛する'],
    語類: ['vs-s,vt'],
    定義: ['to love'],
    用例: ['ロメオはジュリエットが愛している男だ'],
    rating: 0,
  },
  あいだ: {
    cardType: 'vocab',
    id: uuidv4(),
    語彙: 'あいだ',
    漢字: ['間'],
    語類: ['n-adv,n'],
    定義: ['space; gap', 'time; pause', 'span (temporal or spatial)'],
    用例: ['あなたはメグと私の間に座ることになっています。'],
    rating: 0,
  },
};

const INITITAL_STATE = { ...VOCAB_DATA };
const vocabCollectionReducer = (state = INITITAL_STATE, action) => {
  switch (action.type) {
    case VocabCollectionActionTypes.RATE_VOCAB:
      return {
        ...state,
        [action.payload.kana]: vocabReducer(
          ...[state[action.payload.kana]],
          action,
        ),
      };
    case VocabCollectionActionTypes.ADD_VOCAB:
      console.log(action.payload.語彙);
      return {
        ...state,
        [action.payload.語彙]: vocabReducer({}, action),
      };

    case VocabCollectionActionTypes.EDIT_VOCAB:
      return {
        ...state,
        [action.payload.語彙]: vocabReducer(
          state[action.payload.語彙],
          action,
        ),
      };
    case 'DELETE_CARD':
      return deleteCard(state, action.payload.card);

    default:
      return state;
  }
};

export default vocabCollectionReducer;