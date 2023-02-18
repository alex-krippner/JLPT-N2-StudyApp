import React from "react";
import styled from "@emotion/styled";

const BaseGrid = styled.div<GridProps>((props) => ({
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  gridGap: props.gridGap || 30,
  height: "100%",
  width: "100%",
  padding: props.padding || "3rem",

  "@media only screen and (max-width: 600px)": {
    padding: 0,
  },
}));

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
  gridGap?: number;
  padding?: number | string;
}

export const Grid = (props: GridProps) => {
  const { testId, ...other } = props;
  return <BaseGrid className="MonGridBase" data-test-id={testId} {...other} />;
};

export default Grid;
