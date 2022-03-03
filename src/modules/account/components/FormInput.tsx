import styled from "styled-components";
import Input from "@mon-ui-kit/components/Input";
import React from "react";

interface FormInputProps
  extends React.HTMLAttributes<HTMLInputElement> {
  valid?: boolean;
}

const FormInput = styled(Input)<FormInputProps>(
  ({ valid, theme }) => ({
    height: "3em",
    borderBottom: `1px solid ${
      valid ? theme.colorOf.black : theme.colorOf.red
    }`,
    background: theme.colorOf.whiteMedium,
    fontSize: "1.25rem",
  }),
);

export default FormInput;
