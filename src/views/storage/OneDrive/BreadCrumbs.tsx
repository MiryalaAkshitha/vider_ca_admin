import { Breadcrumbs, Typography } from "@mui/material";
import useQueryParams from "hooks/useQueryParams";

function BreadCrumbs() {
  const { queryParams, setQueryParams } = useQueryParams();
  const breadCrumbs = queryParams.breadCrumbs?.split("|") || [];

  const handleClick = (index: number, id: string) => {
    let newBreadCrumbs = [...breadCrumbs];
    newBreadCrumbs.splice(index + 1);
    setQueryParams({
      ...queryParams,
      breadCrumbs: newBreadCrumbs.join("|"),
      folderId: id,
    });
  };

  if (breadCrumbs.length === 0) return null;

  return (
    <Breadcrumbs maxItems={8} aria-label="breadcrumb">
      <Typography
        variant="body1"
        color="primary"
        sx={{ cursor: "pointer" }}
        onClick={() => setQueryParams({ folderId: "root" })}
      >
        Home
      </Typography>
      {breadCrumbs?.map((item: any, index: number) => {
        const [name, id] = item.split("~");
        return (
          <Typography
            variant="body1"
            color="primary"
            key={index}
            sx={{ cursor: "pointer" }}
            onClick={() => handleClick(index, id)}
          >
            {name}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
}

export default BreadCrumbs;
