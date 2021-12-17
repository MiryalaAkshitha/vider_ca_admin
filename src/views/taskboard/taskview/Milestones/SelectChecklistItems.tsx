import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { getChecklists } from "api/services/tasks";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { IAddMilestoneState } from "./AddMilestone";
import {
  StyledChecklistContainer,
  StyledChecklistHeader,
  StyledChecklistItem,
} from "./styled";

interface Props {
  state: IAddMilestoneState;
  setState: Dispatch<SetStateAction<IAddMilestoneState>>;
}

function SelectChecklistItems({ state, setState }: Props) {
  const params = useParams();

  const { data }: ResType = useQuery(
    ["checklists", params.taskId],
    getChecklists
  );

  const handleChange = (id: number) => {
    if (state.checklistItems.includes(id)) {
      setState({
        ...state,
        checklistItems: state.checklistItems.filter((item) => item !== id),
      });
      return;
    }
    setState({
      ...state,
      checklistItems: [...state.checklistItems, id],
    });
  };

  return (
    <StyledChecklistContainer>
      <header>
        <Typography variant="body1" color="rgba(0,0,0,0.6)">
          Select Checklist items
        </Typography>
      </header>
      <main>
        {data?.data?.map((checklist: any, index: number) => (
          <Box mb={3} key={index}>
            <StyledChecklistHeader>
              <div>
                <KeyboardArrowDownOutlined fontSize="small" color="secondary" />
              </div>
              <Typography variant="subtitle2">{checklist?.name}</Typography>
            </StyledChecklistHeader>
            {checklist?.checklistItems?.map((item: any, index: number) => (
              <StyledChecklistItem index={index} key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checklistItems.includes(item?.id)}
                      onChange={() => handleChange(item?.id)}
                      size="small"
                    />
                  }
                  label={item?.name}
                />
              </StyledChecklistItem>
            ))}
          </Box>
        ))}
      </main>
    </StyledChecklistContainer>
  );
}

export default SelectChecklistItems;
