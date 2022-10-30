import React from "react";
import styled from "styled-components";

import hero from "../../assets/hero.svg";

const Wrapper = styled.div(({ theme }) => ({
  display: "flex",
  height: "100vh",
  width: "100vw",
  padding: theme.sizeOf.paddingLarge,
  boxShadow: "2px 2px 10px 1px rgba(0, 0, 0, 0.2)",
  backgroundImage: `url(${hero})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}));

interface BackgroundHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
}

export const Background = (props: BackgroundHeroProps) => {
  const { testId, ...other } = props;
  return (
    <Wrapper data-test-id={testId} {...other}>
      {props.children}
    </Wrapper>
  );
};
