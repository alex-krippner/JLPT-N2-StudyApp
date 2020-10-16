import styled from 'styled-components';

const CardScene = styled.div`
  height: 90%;
  width: 85rem;
`;

const CardSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.8s ease, background 0.8s ease;
  background-color: var(--color-white);
  font-size: var(--font-size-medium);
  color: var(--color-primary-dark);
 

  .top {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 5px;
    font-size: var(--font-size-small);
  }



    .sentenceWrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      height: 100%;
      margin: 0;
      padding: 1rem;
      font-size: var(--font-size-small);
    }

    .paragraph {
      display: flex;
      align-items: center;
      margin: 0;
    }
  }

  .dot {
    display: inline-block;
    height: 1rem;
    width: 1rem;
    margin-right: 1rem;
    border-radius: 50%;
    border: solid 1px #708090;
    background-color: var(--color-white);
  }
`;

const Front = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .menu-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

const FrontData = styled.div`
  display: flex;
  align-items: ${(props) => (props.grammar ? 'center' : '')};
  text-align: ${(props) => (props.grammar ? '' : 'center')};
  height: 90%;
  width: ${(props) => (props.grammar ? '' : '75%')};
  line-height: ${(props) => (props.grammar ? '' : '2')};
  font-size: ${(props) =>
    props.grammar
      ? 'var(--font-size-large)'
      : 'var(--font-size-small)'};
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
`;

const BackSection = styled.section.attrs((props) => ({
  borderBottom: () =>
    props.section < props.labelNum - 1 ? 'solid 1px' : '',
}))`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  font-size: var(--font-size-medium);
  border-bottom: ${(props) => props.borderBottom};
  height: ${(props) => (props.section === 1 ? '20%' : '40%')};
`;

const Top = styled.div`
  flex: 0 0 20%;
  padding: 5px;
  font-size: var(--font-size-small);
  color: var(--color-primary-light);
`;

const Bottom = styled.div`
  flex: 0 0 80%
  justify-content: center;
  width: 100%;  
  margin: 0;
  filter: ${(props) =>
    props.blur === false && props.tabLabel === 'solution'
      ? 'blur(3px)'
      : 'none'};
  cursor: ${(props) =>
    props.tabLabel === 'solution' ? 'pointer' : ''};
    overflow: auto;


  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 100%;
    width: 100%;
    background: ${(props) =>
      props.visible === false && props.tabLabel === 'solution'
        ? 'rgba(63, 81, 181, 0.8)'
        : 'transparent'};
  }
`;

const Passage = styled.div`
  height: 90%;
  width: 100%;
  padding: 1rem;
  overflow: auto;
`;

const cardReadingGramStyles = {
  CardScene,
  CardSide,
  Front,
  FrontData,
  RatingContainer,
  BackSection,
  Top,
  Bottom,
  Passage,
};

export default cardReadingGramStyles;
