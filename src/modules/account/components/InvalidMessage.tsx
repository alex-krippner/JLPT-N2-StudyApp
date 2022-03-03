import styled from "styled-components";
import Text from "@mon-ui-kit/components/Text";
import React from "react";

interface InvalidMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  valid?: boolean;
}

const InvalidMessage = styled(Text)<InvalidMessageProps>(
  ({ valid, theme }) => ({
    paddingTop: "5px",
    fontSize: theme.sizeOf.textSmall,
    color: valid ? "transparent" : theme.colorOf.red,
  }),
);

export default InvalidMessage;
