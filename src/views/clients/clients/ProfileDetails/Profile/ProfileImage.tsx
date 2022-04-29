import { http } from "api/http";
import { icons } from "assets";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import {
  StyledProfileImage,
  StyledProfileImageContainer,
} from "views/clients/clients/styles";

function ProfileImage({ src, onChange }: any) {
  const snack = useSnack();
  const [url, setUrl] = useState(null);

  const uploadImage = (e: any) => {
    if (!e.target.files[0]) return;
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
      <label htmlFor="profile">
        <StyledProfileImageContainer>
          <StyledProfileImage src={url ?? src ?? icons.user} alt="" />
        </StyledProfileImageContainer>
      </label>
      <input
        onChange={uploadImage}
        type="file"
        style={{ display: "none" }}
        id="profile"
      />
    </>
  );
}

export default ProfileImage;
