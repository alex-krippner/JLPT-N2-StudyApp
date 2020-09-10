import { v4 as uuidv4 } from 'uuid';

import ReadingCollectionActionTypes from './readingCollection.actionTypes';
import readingReducer from './reading.reducer';

const READING_DATA = [
  {
    cardType: 'reading',
    id: uuidv4(),
    passage: [
      '近年、インターネットやLANを利用して行う会議、いわゆる電子会議が広まっている。電子会議の長所は会場に参加者が集まらなくてもいいことだが、それだけではない。一般に、普通の会議では　「周囲の目」が気になって、だれか（特に目上の人）が発言している間「うんうん」とうなずいたりして「聞いていますよ」という態度を「周囲」に示し続けることに意識が向かってしまう。しかし、実はその間、思考のほうはストップしてしまいやすい。それに対し、電子会議の場合は、「周囲」を気にする必要がなく、自分の意考を止めずにほかの人の発言が聞ける。その結果、新しいアイデアが浮かぶことが多いのである。',
    ],
    question: ['この文章の内容として最も適切なものはどれか。'],
    choices: [
      '普通の会議より電子会議のほうが、アイデアが出やすい。',
      '普通の会議より電子会議のほうが、周囲が気になる。',
      '電子会議は普通の会議と違って、わざわざ会場に行かなくてもよい。',
      '電子会議は普通の会議より、考える時間が短い。',
    ],
    solution: [
      '正解',
      '周囲が気になるのは、普通の会議のほうである',
      '「会場に参加者が集まらなくてもいいことだが、それだけではない」と書かれている',
      '電子会議は考える時間が短いとは書かれていない',
    ],
    rating: 0,
  },
];

const INITIAL_STATE = READING_DATA;

const readingCollectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReadingCollectionActionTypes.RATE_READING:
      return state.map((reading) => readingReducer(reading, action));
    case ReadingCollectionActionTypes.ADD_READING:
      return [...state, readingReducer({}, action)];
    case ReadingCollectionActionTypes.DELETE_READING:
      return state.filter(
        (reading) => reading.id !== action.payload.id,
      );
    default:
      return state;
  }
};

export default readingCollectionReducer;
