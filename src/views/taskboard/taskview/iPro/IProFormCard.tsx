import { Box, Chip, Radio, Typography } from "@mui/material";

interface Props {
  index: number;
  item: any;
  selected: string;
  setSelected: (v: string) => void;
}

function IProFormCard({ index, item, selected, setSelected }: Props) {
  return (
    <Box
      sx={{
        border: "1px solid rgba(0,0,0,0.1)",
        display: "flex",
        gap: 1,
        borderRadius: 1,
        p: 2,
      }}
    >
      <div>
        <Radio
          name="form"
          onChange={() => setSelected(item?._id)}
          checked={selected === item?._id}
          id={`form-${index}`}
        />
      </div>
      <label style={{ cursor: "pointer", flex: 1 }} htmlFor={`form-${index}`}>
        <Box>
          <Typography variant="subtitle2">{item?.name}</Typography>
          <Typography variant="body2">{item?.description}</Typography>
          <Box mt={1} display="flex" gap={1}>
            {item?.tags?.map((tag: string) => (
              <Chip size="small" label={tag} variant="outlined" />
            ))}
          </Box>
        </Box>
      </label>
    </Box>
  );
}

export default IProFormCard;
