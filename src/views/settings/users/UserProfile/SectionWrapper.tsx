import { Cancel, Edit, Save } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

interface IProps {
  title: string;
  children: any;
  editable: boolean;
  setEditable: (editable: boolean) => void;
  onSave?: () => void;
}

const SectionWrapper = (props: IProps) => {
  const { title, children, editable, setEditable, onSave } = props;
  return (
    <Box
      mb={3}
      sx={{
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        mb={1}
        justifyContent="space-between"
        sx={{
          background: "rgb(24, 47, 83, 0.05)",
          px: 2,
          py: 1,
        }}
      >
        <Box>
          <Typography variant="subtitle2" color="primary">
            {title}
          </Typography>
        </Box>
        {!editable ? (
          <Button
            startIcon={<Edit />}
            onClick={() => {
              setEditable(true);
            }}
            size="small"
            color="secondary"
          >
            Edit
          </Button>
        ) : (
          <Box display="flex" gap={1}>
            <Button
              startIcon={<Cancel />}
              onClick={() => {
                setEditable(false);
              }}
              size="small"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              startIcon={<Save />}
              onClick={() => {
                onSave && onSave();
              }}
              size="small"
              color="secondary"
            >
              Save
            </Button>
          </Box>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default SectionWrapper;
