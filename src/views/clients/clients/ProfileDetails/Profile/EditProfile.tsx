import EditIcon from "@mui/icons-material/Edit";
import { http } from "api/http";
import useSnack from "hooks/useSnack";
import { useState } from "react";

const EditProfile = ({ onChange }) => {
  const snack = useSnack();
  const [, setUrl] = useState(null);

  const uploadImage = (e: any) => {
    if (!e.target.files) return;
    const formData = new FormData();
    formData.append("file", e.target.files);
    http
      .post("/common/upload", formData)
      .then((res: any) => {
        setUrl(res.data.Location);
        onChange(res.data.key);
        alert("hello");
      })
      .catch((err) => {
        snack.error("error occurred");
      });
  };
  return (
    <>
      <label htmlFor="profile">
        <EditIcon fontSize="small" sx={{ color: "red" }} />
      </label>
      <input
        onChange={uploadImage}
        type="file"
        style={{ display: "none" }}
        id="profile"
      />
    </>
  );
};
export default EditProfile;
