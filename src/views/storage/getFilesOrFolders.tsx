import moment from "moment";

interface IProps {
  type: "folder" | "file";
  data: any;
  sortBy: string;
}

export const getFilesOrFolders = ({ sortBy, data, type }: IProps) => {
  let result = data?.filter((item) => item.type === type) || [];

  if (sortBy === "a_z") {
    result = result?.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === "z_a") {
    result = result?.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sortBy === "date_newest") {
    result = result?.sort((a, b) => {
      return moment.utc(b?.createdAt).local().diff(moment(a.createdAt));
    });
  }

  if (sortBy === "date_oldest") {
    result = result?.sort((a, b) => {
      return moment.utc(a?.createdAt).local().diff(moment(b.createdAt));
    });
  }

  if (type === "file") {
    if (sortBy === "size_low_to_high") {
      result = [...(result || [])]?.sort((a, b) => a.fileSize - b.fileSize);
    }
    if (sortBy === "size_high_to_low") {
      result = [...(result || [])]?.sort((a, b) => b.fileSize - a.fileSize);
    }
  }

  return result;
};
