// Styles.tsx
import { styled } from "@mui/system";

export const StyledHeader = styled("header")(() => ({
  margin: "20px 0",
}));

export const StyledButton = styled("button")(() => ({
  padding: "0",
  borderRadius: "50%",
  color: "white",
  backgroundColor: "black",
  width: "40px",
  height: "40px",
  borderStyle: "none",
  "&:hover": {
    cursor: "pointer",
  },
}));
