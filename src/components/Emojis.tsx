// Emojis.tsx
import { Grid, Typography } from "@mui/material";
import { useGlobalContext } from "../contexts/hook";
import { MoonLoader } from "react-spinners";
import { removedEmojiCodes } from "./remEmojiCodes";
import "../App.css";

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Emojis = () => {
  const context = useGlobalContext();

  if (!context) {
    return null;
  }

  const { emojis, loading } = context;

  if (loading) {
    return (
      <MoonLoader color="#36d7b7" loading={loading} cssOverride={override} />
    );
  }

  const filteredEmojis = emojis.filter(
    (emoji) => !removedEmojiCodes.includes(emoji.codePoint)
  );

  if (emojis.length === 0) {
    return (
      <div style={{ margin: "50px 0", textAlign: "center" }}>
        <Typography variant="h2">No emojis found</Typography>
      </div>
    );
  }

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        {filteredEmojis.map((emoji) => (
          <Grid
            key={emoji.codePoint}
            container
            justifyContent="flex-start"
            alignItems="center"
            spacing={4}
            style={{ margin: "0 auto" }}
            flexWrap="wrap"
          >
            <Grid item xs={12} sm={5} className="centerEmojiAtXs">
              <Typography variant="h3">{emoji.character}</Typography>
            </Grid>
            <Grid item xs={12} sm={2} className="centerTextAtXs">
              <Typography variant="subtitle1">
                {emoji.unicodeName.replace(/^[^\s]*\s/, "")}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Emojis;
