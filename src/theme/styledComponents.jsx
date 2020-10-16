import styled from 'styled-components';

const CardScene = styled.div`
  height: 90%;
  width: 85rem;
`;

const CardSceneSmall = styled.div`
  height: ${(props) =>
    props.cardType === 'vocab' ? '45rem' : '40rem'};
  perspective: 200rem;
  -moz-perspective: 150rem;
  width: ${(props) =>
    props.cardType === 'vocab' ? '35rem' : '30rem'};
  user-select: none;
`;
const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
  color: var(--color-primary-dark);
`;

const CardSideLarge = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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

const CardSideSmall = styled.div.attrs((props) => ({
  fontSize:
    props.cardType === 'vocab'
      ? 'var(--font-size-large)'
      : 'var(--font-size-huge)',
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  backface-visibility: hidden;
  border-radius: 1rem;
  transition: transform 0.8s ease, background 0.8s ease;
  background-color: var(--color-white);
  border: solid 1px #708090;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);

  font-size: ${(props) =>
    props.front ? props.fontSize : 'var(--font-size-small)'};
  transform: ${(props) =>
    props.back ? ' rotateY(180deg)' : 'rotateY(0)'};
  cursor: ${(props) => (props.back ? 'pointer' : '')};

  .top {
    padding: 5px;
    border-right: solid 1px;
    border-bottom: solid 1px;
    font-size: var(--font-size-small);
  }

  .bottom {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 80%;
    margin: 0;

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
  flex-direction: column;
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

const FrontDataSmall = styled.div`
  flex: 0 0 80%;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: center;
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

const BackSectionSmall = styled.section.attrs((props) => ({
  borderBottom: () =>
    props.section < props.labelNum - 1 ? 'solid 1px' : '',
}))`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: var(--font-size-medium);
  border-bottom: ${(props) => props.borderBottom};
  height: min-content;
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

export const CardsContainerStyled = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  grid-gap: 30px;
  height: 100%;
  width: 100%;
  padding: 3rem;

  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;

export const WrapperMain = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
  background-color: var(--color-white-medium);
  overflow-y: scroll;

  @media only screen and (max-width: 430px) {
    width: 100%;
  }

  /* The emerging W3C standard
   that is currently Firefox-only */

  scrollbar-width: thin;

  scrollbar-color: var(--color-scrollbar);

  /* Works on Chrome/Edge/Safari */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: var(--color-scrollbar);
  }
  &::-webkit-scrollbar-track-piece:end {
    background: transparent;
    margin-bottom: 20px;
  }

  &::-webkit-scrollbar-track-piece:start {
    background: transparent;
    margin-top: 20px;
  }
`;

export const cardReadingGramStyles = {
  CardScene,
  CardSideLarge,
  Front,
  FrontData,
  RatingContainer,
  BackSection,
  Top,
  Bottom,
  Passage,
};

export const cardKanjiVocabStyles = {
  CardSceneSmall,
  CardWrapper,
  CardSideSmall,
  Front,
  FrontDataSmall,
  BackSectionSmall,
  RatingContainer,
};
