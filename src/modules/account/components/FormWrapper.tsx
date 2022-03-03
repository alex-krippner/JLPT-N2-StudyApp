import styled from "styled-components";
import Box from "@mon-ui-kit/components/Box";

const FormWrapper = styled(Box)(({ theme }) => ({
  justifyContent: "space-around",
  height: "max-content",
  width: "20%",
  padding: "2em",
  background: theme.colorOf.whiteMedium,
  border: `1px solid ${theme.colorOf.black}`,
  borderRadius: "10px",
  overflow: "auto",
}));

export default FormWrapper;
