import { http } from "api/http";
import { icons } from "assets";
import { snack } from "components/toast";
import { useRef, useState } from "react";
import {
  StyledProfileImage,
  StyledProfileImageContainer,
} from "views/clients/styles";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function ProfileImage({ src, onChange }: any) {
  const [url, setUrl] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadImage = (e: any) => {
    let file: File = e.target.files[0];
    if (!file) return;

    let notValid =
      file.type !== "image/jpeg" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/png";

    if (notValid) {
      return snack.error("Only jpeg and png images are allowed");
    }

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    http
      .post("/common/upload", formData)
      .then((res: any) => {
        setUrl(res.data.Location);
        onChange(res.data.key);
      })
      .catch((err) => {
        snack.error("error occurred");
      });
  };

  return (
    <>
      <StyledProfileImageContainer>
        <StyledProfileImage src={url ?? src ?? icons.user} alt="" />
        <IconButton
          sx={{
            position: "absolute",
            top: -10,
            right: -15,
          }}
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <Edit fontSize="small" sx={{ color: "red" }} />
        </IconButton>
      </StyledProfileImageContainer>
      <input
        ref={inputRef}
        onChange={uploadImage}
        type="file"
        style={{ display: "none" }}
        id="profile"
      />
    </>
  );
}

export default ProfileImage;
