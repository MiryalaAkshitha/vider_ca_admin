import { ArrowRightAltOutlined, MoreVert } from "@mui/icons-material";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { cloneService, deleteService } from "api/services/services";
import CustomCard from "components/CustomCard";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import { MouseEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { handleError } from "utils/handleError";

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

  const { mutate: onClone } = useMutation(cloneService, {
    onSuccess: () => {
      snack.success("Service cloned successfully");
      queryClient.invalidateQueries("services");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    let options = [
      {
        label: "Clone",
        action: () => {
          onClone({ id: data.id });
        },
      },
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
    ];

    if (!data?.fromAdmin) {
      options.splice(0, 0, {
        label: "Edit",
        action: () => {
          navigate(`add/?serviceId=${data.id}`);
        },
      });
    }

    menu({
      target: e.currentTarget,
      options,
    });
  };

  return (
    <CustomCard
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        wordBreak: "break-all"
      }}
    >
      <Box flex={1}>
        <Box display="flex" gap={1} justifyContent="space-between">
          <Box>
            <Typography variant="caption" color="rgba(0,0,0,0.6)">
              {data?.category?.name} {data?.subCategory && `-- ${data?.subCategory?.name}`}{" "}
              {data?.fromAdmin && <span style={{ color: "red" }}>-- From Vider</span>}
            </Typography>
            <Typography sx={{ flex: 1 }} color="primary" variant="subtitle2">
              {data?.name}
            </Typography>
          </Box>
          <div>
            <IconButton size="small" onClick={handleClick}>
              <MoreVert />
            </IconButton>
          </div>
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
      </Box>
      <Box textAlign="right">
        <Divider sx={{ my: 1 }} />
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
