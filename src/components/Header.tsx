// Header.tsx
import { TextField, Typography, Grid } from "@mui/material";
import { StyledHeader, StyledButton } from "./Styles";
import { FaSearch } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import { useGlobalContext } from "../contexts/hook";

const Header = () => {
  const [inputText, setInputText] = useState("");
  const context = useGlobalContext();

  if (!context) {
    return null;
  }

  const { setSearchTerm } = context;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputText(value);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchTerm(inputText);
  };

  return (
    <>
      <StyledHeader>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <Grid item>
            <Typography
              variant="h3"
              gutterBottom
              style={{ margin: "10px 0 20px", textAlign: "center" }}
            >
              Emoji Search
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                fullWidth
                sx={{ width: "70vw", marginBottom: "10px" }}
                value={inputText}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item style={{ marginLeft: "10px" }}>
              <StyledButton onClick={handleButtonClick}>
                <FaSearch style={{ cursor: "pointer", fontSize: "1rem" }} />
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </StyledHeader>
    </>
  );
};

export default Header;
