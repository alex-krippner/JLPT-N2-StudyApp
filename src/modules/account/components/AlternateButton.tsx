import styled from "styled-components";
import Button from "@mon-ui-kit/components/Button";

const AlternateButton = styled(Button)(({ theme }) => ({
  position: "relative",
  width: "max-content",
  fontSize: theme.sizeOf.textMedium,
  padding: "2px",
  color: theme.colorOf.primaryLight,
  transition: "border-color .4s ease",
  borderBottom: `2px solid transparent`,
  "&:hover": {
    transition: "border-color .4s ease",
    borderBottom: `2px solid ${theme.colorOf.primaryLight}`,
  },
}));

export default AlternateButton;
