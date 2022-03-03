import styled from "styled-components";
import Text from "@mon-ui-kit/components/Text";

const Label = styled(Text)(({ theme }) => ({
  position: "relative",
  width: "100%",
  textAlign: "center",
  color: theme.colorOf.secondaryMedium,
  fontSize: theme.sizeOf.textMedium,
}));

export default Label;
