import { Paper, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { Box } from "@mui/system";
import _ from "lodash";

interface IPermissionAccordion {
  permissions: number[];
  handlePermissionChange: (id: number) => void;
  label: string;
  data: any;
}

const PermissonsAccordion = (props: IPermissionAccordion) => {
  const { permissions, data, handlePermissionChange, label } = props;

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" mb={2}>
        {label}
      </Typography>
      {data?.map((item: any, index: number) => (
        <Box
          sx={{
            borderBottom: "1px dashed rgba(0,0,0,0.1)",
            marginBottom: "20px",
            gap: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
          key={index}
        >
          <Box flex={1}>
            <Typography variant="body2">{_.startCase(_.lowerCase(item?.name))}</Typography>
          </Box>
          <Box>
            <Switch
              onChange={() => handlePermissionChange(item.id)}
              checked={permissions.includes(item?.id)}
            />
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default PermissonsAccordion;
