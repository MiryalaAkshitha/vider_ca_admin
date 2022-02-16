import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import FormattedDate from "components/FormattedDate";
import Members from "components/Members";
import PriorityText from "components/PriorityText";
import useQueryParams from "hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import { getTitle } from "utils";
import { StyledSubTaskTable } from "views/taskboard/styles";

type Props = {
  data: any;
};

function SubTasksList({ data }: Props) {
  const navigate = useNavigate();
  const { queryParams } = useQueryParams();

  const handleClick = (item: any) => {
    navigate(`/task-board/${item?.id}/?clientId=${queryParams.clientId}`);
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
                <tr key={index} onClick={() => handleClick(item)}>
                  <td>
                    <Typography variant="body2">{item.name}</Typography>
                  </td>
                  <td>
                    <FormattedDate variant="body2" date={item.dueDate} />
                  </td>
                  <td>
                    <Members
                      data={
                        item?.members?.map((item) => ({
                          src: "",
                          title: item?.firstName,
                        })) || []
                      }
                    />
                  </td>
                  <td>
                    <PriorityText text={item.priority} />
                  </td>
                  <td>
                    <Typography variant="body2">
                      {getTitle(item.status)}
                    </Typography>
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
