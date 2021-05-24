import styled from 'styled-components';

const CardSide = styled.div<StyledProps>`
  position: ${(props) => props.position || 'absolute'};
  top: ${(props) => props.top || '0'};
  left: ${(props) => props.left || '0'};
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
  display: ${(props) => props.display || 'flex'};
  flex-direction: ${(props) => props.fxDirection || 'column'};
  border-radius: ${(props) => props.borderRadius || '1rem'};
  background-color: ${(props) =>
    props.bgColor || 'var(--color-white)'};
  border: ${(props) => props.border || 'solid 1px #708090'};
  box-shadow: ${(props) =>
    props.boxShadow || '0px 0px 5px 1px rgba(0, 0, 0, 0.2)'};
  backface-visibility: hidden;
  font-size: ${(props) => props.fontSize};
  transform: ${(props) => props.transform};
  cursor: ${(props) => props.cursor};
`;

export default CardSide;
