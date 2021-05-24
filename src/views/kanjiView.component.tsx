import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import CardContainer from '../components/containers/CardContainer';
import { rateKanji } from '../redux/kanjiCollection.reducer';
import { RootState } from '../redux/store';
import CardContainerTest from '../components/containers/CardContainerTest.';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const tabLabels: KanjiTabLabels[] = ['読み', '単語例', '用例'];

const KanjiView = () => {
  const dispatch = useDispatch();
  const kanjiState = useSelector((state: RootState) =>
    Object.values(state.kanjiCollection),
  );
  const handleRate = (kanji: string, rating: number) => {
    dispatch(rateKanji({ kanji, rating }));
  };
  return (
    <Wrapper>
      <CardContainer
        data={kanjiState}
        label="漢字"
        onRate={handleRate}
        tabLabels={tabLabels}
      />
    </Wrapper>
  );
};

export default KanjiView;

//
// <CardContainer
//     data={kanjiState}
//     label="漢字"
//     onRate={handleRate}
//     tabLabels={tabLabels}
// />
