import { ArrowRightAltOutlined, MoreVert } from "@mui/icons-material";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteService } from "api/services/services";
import CustomCard from "components/CustomCard";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import { MouseEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

function ServiceCard({ data }) {
  const menu = useMenu();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteService, {
    onSuccess: () => {
      snack.success("Service deleted successfully");
      queryClient.invalidateQueries("services");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Delete",
          action: () => {
            confirm({
              msg: "Are you sure you want to delete this service?",
              action: () => {
                mutate({ id: data?.id });
              },
            });
          },
        },
      ],
    });
  };

  return (
    <CustomCard
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="caption" color="rgba(0,0,0,0.6)">
        {data?.category?.name}{" "}
        {data?.subCategory && `-- ${data?.subCategory?.name}`}
      </Typography>
      <Box display="flex" gap={1} alignItems="center">
        <Typography sx={{ flex: 1 }} color="primary" variant="subtitle2">
          {data?.name}
        </Typography>
        <IconButton size="small" onClick={handleClick}>
          <MoreVert />
        </IconButton>
      </Box>
      <Typography color="gray" variant="body2">
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            lineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
          dangerouslySetInnerHTML={{ __html: data?.description }}
        ></div>
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Box textAlign="right">
        <Button
          onClick={() => {
            navigate(`/services/add/?serviceId=${data?.id}`);
          }}
          endIcon={<ArrowRightAltOutlined />}
        >
          View details
        </Button>
      </Box>
    </CustomCard>
  );
}

export default ServiceCard;
