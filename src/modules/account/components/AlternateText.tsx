import styled from "styled-components";
import Text from "@mon-ui-kit/components/Text";

const AlternateText = styled(Text)(({ theme }) => ({
  marginBottom: "1em",
  fontSize: theme.sizeOf.textSmall,
}));

export default AlternateText;
