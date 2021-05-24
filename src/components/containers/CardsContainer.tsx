import styled from 'styled-components';

const CardsContainer = styled.div`
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

export default CardsContainer;
