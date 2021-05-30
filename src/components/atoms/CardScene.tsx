import styled from 'styled-components';

const CardScene = styled.div`
  height: 90%;
  width: 85rem;

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

export default CardScene;
