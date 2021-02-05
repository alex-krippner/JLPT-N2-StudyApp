import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import CardContainer from '../components/containers/CardContainer.component';
import { rateKanji } from '../redux/kanjiCollection/kanjiCollection.reducer';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const tabLabels = ['読み', '単語例', '用例'];

const KanjiView = () => {
  const dispatch = useDispatch();
  const kanjiState = useSelector((state) =>
    Object.values(state.kanjiCollection),
  );
  const handleRate = (kanji, rating) => {
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
