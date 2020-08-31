import { v4 as uuidv4 } from 'uuid';

import GrammarCollectionActionTypes from './grammarCollection.actionTypes';
import grammarReducer from './grammar.reducer';

const GRAMMAR_DATA = {
  としたら: {
    cardType: 'grammar',
    id: uuidv4(),
    variations: [
      '～とすれば',
      '～とすると',
      '～となったら',
      '～となれば',
      '～となると',
    ],
    意味: ['～と仮定した場合', '～ということになった場合'],
    接続: [
      '普通形　＋　としたら・とすれば・とすると',
      '名普通形　＋　となったら・となれば・となると',
    ],
    用例: [
      '無人島に何か一つだけ持っていけるとしたら、何をもっていきたいですか',
      'もし、あの飛行機に乗っていたとしたら、僕はもうこの世にいなかった',
    ],
    rating: 0,
  },
  ものなら: {
    cardType: 'grammar',
    id: uuidv4(),
    variations: [''],
    意味: ['もし～できるなら、そうしたい・そうしてほしい'],
    接続: ['動辞書形　＋　ものなら'],
    用例: [
      '戻れるものなら２０年前の私に戻って人生をやり直したい',
      'あの日の出来事を忘れられるものなら忘れたいのに…',
    ],
    rating: 0,
  },
  ようものなら: {
    cardType: 'grammar',
    id: uuidv4(),
    variations: [''],
    意味: ['もし～たら、大変なことになる'],
    接続: ['動う・よう形　＋　ものなら'],
    用例: [
      'わたしはアレルギー体質なので、会わない食品を食べようものなら、体のあちこちがかゆくなる。',
      '山道は危ない。ちょっと足を踏み外そうものなら、大けがをするだろう',
    ],
    rating: 0,
  },
  ないことには: {
    cardType: 'grammar',
    id: uuidv4(),
    variations: [''],
    意味: ['～なければ、あることが実現しない'],
    接続: [
      '動ないけい・イ形くない・ナ形－でない・名－でない　＋　ことには',
    ],
    用例: [
      '一度会ってみないことには、仕事を任せられる人かどうかわからない',
      'お金がないことには、この計画は進められない',
    ],
    rating: 0,
  },
  を抜きにしては: {
    cardType: 'grammar',
    id: uuidv4(),
    variations: [''],
    意味: [
      '～がなければ・～を考えに入れない状態では、あることが実現しない',
    ],
    接続: [
      '動ないけい・イ形くない・ナ形－でない・名－でない　＋　ことには',
    ],
    用例: [
      '一度会ってみないことには、仕事を任せられる人かどうかわからない',
      'お金がないことには、この計画は進められない',
    ],
    rating: 0,
  },
  としても: {
    cardType: 'grammar',
    id: uuidv4(),
    variations: ['～にしても', '～にしろ', '～にせよ'],
    意味: [
      'たとえ～ということが事実でも、話者の気持ちはそれに影響されない',
    ],
    接続: [
      '普通形　＋　としても',
      '名・普通形（ナ形―である）＋にしても・にしろ・にせよ　',
    ],
    用例: [
      '親元を離れるとしても、できるだけ親の近くに住む方がいい',
      '準備時間が短ったにしても、もう少し立派な報告書を書いてほしかった',
    ],
    rating: 0,
  },
};

const INITIAL_STATE = { ...GRAMMAR_DATA };

const grammarCollectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GrammarCollectionActionTypes.RATE_GRAMMAR:
      return {
        [action.payload.grammar]: grammarReducer(
          ...[state[action.payload.grammar]],
          action,
        ),
      };

    case GrammarCollectionActionTypes.ADD_GRAMMAR:
      return {
        [action.payload.grammar]: grammarReducer({}, action),
      };
    default:
      return state;
  }
};

export default grammarCollectionReducer;
