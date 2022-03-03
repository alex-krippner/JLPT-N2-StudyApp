import styled from "styled-components";
import Text from "@mon-ui-kit/components/Text";

const Title = styled(Text)(({ theme }) => ({
  color: theme.colorOf.primaryLight,
  fontSize: theme.sizeOf.fontMedium,
  padding: "0 0.5em",
  marginBottom: "2em",
}));

export default Title;
