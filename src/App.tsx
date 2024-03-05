// App.tsx
import { Grid } from "@mui/material";
import Emojis from "./components/Emojis";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <Emojis />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
