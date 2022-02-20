import styled from 'styled-components';

export const CardFormStyled = styled.div.attrs(
  (props: StyledProps) => ({
    height:
      props.cardType === 'grammar' || props.cardType === 'reading'
        ? '75vh'
        : '45rem',
    width:
      props.cardType === 'grammar' || props.cardType === 'reading'
        ? '75vw'
        : 'var(--width-cardForm)',
    cardTitleTop:
      props.cardType === 'grammar' || props.cardType === 'reading'
        ? '5px'
        : 'var(--top-cardTitle)',
    cardTitleLeft:
      props.cardType === 'grammar' || props.cardType === 'reading'
        ? '5px'
        : 'var(--left-cardTitle)',
    cardTitleWidth:
      props.cardType === 'grammar' || props.cardType === 'reading'
        ? '25%'
        : '50%',
  }),
)<StyledProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background-color: ${(props) => props.theme.colorOf.primaryLight};
  border: solid 1px #708090;
  border-radius: 1rem;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);

  .header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: ${(props) =>
      props.cardType === 'reading' ? '0 1 20%' : '0 1 30%'};
    width: 100%;
    margin-bottom: ${(props) =>
      props.cardType === 'reading' ? '0' : '2rem'};
    border-radius: 0 0 2rem 2rem;
    height: 15%;

    .card-title {
      position: absolute;
      top: ${(props) => props.cardTitleTop};
      left: ${(props) => props.cardTitleLeft};
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: ${(props) => props.cardTitleTop};
      height: 5rem;
      width: ${(props) => props.cardTitleWidth};
      border-radius: 1rem;
      background-color: var(--color-secondary-medium);
      box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
      font-weight: 400;
      font-size: var(--font-size-medium);
      color: var(--color-white-dark);
    }

    .card-front {
      align-self: flex-end;
      font-size: var(--font-size-large);
      color: var(--color-primary-dark);
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70%;
    margin-top: 3rem;
  }
`;
