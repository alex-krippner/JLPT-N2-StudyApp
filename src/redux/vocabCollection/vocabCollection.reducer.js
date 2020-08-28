import { v4 as uuidv4 } from 'uuid';

import VocabCollectionActionTypes from './vocabCollection.actionTypes';
import vocabReducer from '../vocab/vocab.reducer';

const VOCAB_DATA = {
  あっ: {
    id: uuidv4(),
    kana: 'あっ',
    kanji: '',
    parts_of_speech: 'int',
    definitions: ['ah', 'oh'],
    sentenceSample: ['あ！まずい！ガソリンが切れてきた'],
    rating: 0,
  },
  ああ: {
    id: uuidv4(),
    kana: 'ああ',
    kanji: '',
    parts_of_speech: 'adv',
    definitions: ['like that', 'that way'],
    sentenceSample: [
      'ある人はこうだと言い、またある人はああだと言う',
    ],
    rating: 0,
  },
  あい: {
    id: uuidv4(),
    kana: 'あい',
    kanji: '愛',
    parts_of_speech: 'n,n-suf',
    definitions: ['love', 'affection', 'care'],
    sentenceSample: ['愛の動きは不可解'],
    rating: 0,
  },
  あいかわらず: {
    id: uuidv4(),
    kana: '	あいかわらず',
    kanji: '相変わらず',
    parts_of_speech: 'adv,adj-no',
    definitions: ['as ever', 'as usual', 'the same'],
    sentenceSample: ['君は相変わらず健康そうに見える'],
    rating: 0,
  },
  あいさつ: {
    id: uuidv4(),
    kana: 'あいさつ',
    kanji: '挨拶',
    parts_of_speech: 'n,vs,adj-no',
    definitions: [
      'greeting',
      'polite set phrase used to express apology, sympathy, congratulations',
    ],
    sentenceSample: [
      '彼女はにっこり挨拶をした。',
      'この場をお借りして一言挨拶を申し上げます',
    ],
    rating: 0,
  },
  あいじょう: {
    id: uuidv4(),
    kana: 'あいじょう',
    kanji: '愛情',
    parts_of_speech: 'n,adj-no',
    definitions: ['love', 'affection'],
    sentenceSample: ['とりわけ子供たちは愛情を必要とする。'],
    rating: 0,
  },
  あいず: {
    id: uuidv4(),
    kana: 'あいず',
    kanji: '合図',
    parts_of_speech: 'n,vs',
    definitions: ['sign', 'signal'],
    sentenceSample: ['すぐにゴーの合図をしてください。'],
    rating: 0,
  },
  あいする: {
    id: uuidv4(),
    kana: 'あいする',
    kanji: '愛する',
    parts_of_speech: 'vs-s,vt',
    definitions: ['to love'],
    sentenceSample: ['ロメオはジュリエットが愛している男だ'],
    rating: 0,
  },
  あいだ: {
    id: uuidv4(),
    kana: 'あいだ',
    kanji: '間',
    parts_of_speech: 'n-adv,n',
    definitions: [
      'space; gap',
      'time; pause',
      'span (temporal or spatial)',
    ],
    sentenceSample: [
      'あなたはメグと私の間に座ることになっています。',
    ],
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
      return {
        ...state,
        [action.payload.kana]: vocabReducer({}, action),
      };
    default:
      return state;
  }
};

export default vocabCollectionReducer;
