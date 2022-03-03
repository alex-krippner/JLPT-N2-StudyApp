import styled from "styled-components";
import Button from "@mon-ui-kit/components/Button";

const SubmitButton = styled(Button)(({ theme }) => ({
  alignSelf: "center",
  height: "2.5em",
  width: "60%",
  fontSize: theme.sizeOf.textMedium,
  outline: `1px solid ${theme.colorOf.buttonHover}`,
  borderRadius: "10px",
  color: theme.colorOf.secondaryMedium,
  transition: "background 0.5s ease, outline 0.5s ease",
  "&:hover": {
    outline: "none",
    background: theme.colorOf.buttonHover,
    transition: "background 0.5s ease, outline 0.5s ease",
  },
}));

export default SubmitButton;
