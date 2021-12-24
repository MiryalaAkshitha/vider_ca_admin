import { MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { updateSubTask } from "api/services/tasks";
import FormattedDate from "components/FormattedDate";
import Members from "components/Members";
import PriorityText from "components/PriorityText";
import useSnack from "hooks/useSnack";
import { useMutation } from "react-query";
import { getTitle } from "utils";
import { SubTaskStatus } from "utils/constants";
import { StyledSubTaskTable } from "views/taskboard/styles";

type Props = {
  data: any;
};

function SubTasksList({ data }: Props) {
  const snack = useSnack();

  const { mutate } = useMutation(updateSubTask, {
    onSuccess: () => {
      snack.success("Sub task status updted.");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (e: any, item: any) => {
    const status = e.target.value;
    mutate({ id: item?.id, data: { ...item, status } });
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <StyledSubTaskTable>
          <thead>
            <tr>
              <th>
                <Typography variant="subtitle2" color="primary">
                  Task
                </Typography>
              </th>
              <th>
                <Typography variant="subtitle2" color="primary">
                  Due Date
                </Typography>
              </th>
              <th>
                <Typography variant="subtitle2" color="primary">
                  Assignees
                </Typography>
              </th>
              <th>
                <Typography variant="subtitle2" color="primary">
                  Priority
                </Typography>
              </th>
              <th>
                <Typography variant="subtitle2" color="primary">
                  Status
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td>
                    <Typography variant="body2">{item.name}</Typography>
                  </td>
                  <td>
                    <FormattedDate variant="body2" date={item.dueDate} />
                  </td>
                  <td>
                    <Members
                      data={item?.members?.map((item) => ({
                        src: "",
                        title: item?.firstName,
                      }))}
                    />
                  </td>
                  <td>
                    <PriorityText text={item.priority} />
                  </td>
                  <td>
                    <TextField
                      variant="outlined"
                      size="small"
                      select
                      defaultValue={item?.status || ""}
                      onChange={(e) => handleChange(e, item)}
                      required
                      InputProps={{ sx: { minWidth: "120px" } }}
                    >
                      {Object.values(SubTaskStatus).map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {getTitle(item)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </StyledSubTaskTable>
      </Box>
    </div>
  );
}

export default SubTasksList;
