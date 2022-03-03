import styled from "styled-components";

const ObligatorySign = styled.span(({ theme }) => ({
  position: "absolute",
  color: "red",
  fontSize: theme.sizeOf.textSmall,
}));

export default ObligatorySign;
