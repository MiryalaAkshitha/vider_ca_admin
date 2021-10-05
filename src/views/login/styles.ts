import { styled } from "@mui/material/styles";
import { loginBg } from "assets";

export const BackgroundImage = styled("div")(() => ({
  backgroundImage: `linear-gradient(
    to right,
    rgba(24, 47, 83, 0.9),
    rgba(24, 47, 83, 0.9)
  ),
  url(${loginBg})`,
  backgroundSize: "cover",
  position: "relative",
  minHeight: "100vh",
  clipPath: "polygon(0 0,100% 0%,74% 100%,0% 100%)",
}));

export const LogoContainer = styled("div")(() => ({
  position: "absolute",
  top: "30%",
  left: "40%",
}));
