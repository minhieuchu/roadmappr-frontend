import { styled } from "@mui/material/styles";
import backgroundImage from "@/assets/blueprint.jpg";

export const HomePageContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  paddingTop: "2rem",

  "& > div:first-of-type": {
    maxWidth: "76rem",
    width: "100%",

    ".product-description": {
      height: "30rem",
      display: "flex",
      alignItems: "center",
      backgroundImage: `url(${backgroundImage})`,
      borderRadius: "0.75rem",

      "& > div:first-of-type": {
        fontSize: "1.25rem",
        color: "whitesmoke",
        width: "32rem",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        boxSizing: "border-box",
        backdropFilter: "brightness(0.7)",
      },
    },
  },
});
