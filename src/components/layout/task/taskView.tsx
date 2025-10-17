import React from "react";
import {
  Typography,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import { TaskProps } from "@/types/taskType";

const TaskView = ({title ,description, priority, status, tag}: TaskProps) => {
  return (
    <Box sx={{backgroundColor:'lightGray', padding:'10px', borderRadius:'12px'}}>
        <Stack spacing={1} width="100%">
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
          <Stack direction="row" spacing={2}>
            <Typography variant="body2"><strong>Priority:</strong> {priority}</Typography>
            <Typography variant="body2"><strong>Status:</strong> {status}</Typography>
          </Stack>
          {tag && tag.length > 0 && (
            <Stack direction="row" spacing={1} mt={0.5}>
              {tag?.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  variant={"filled"}
                  sx={{
                    cursor: "pointer",
                    borderColor: tag.color,
                    color:"#fff",
                    backgroundColor:tag.color,
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor:tag.color
                    },
                  }}
                />
              ))}
            </Stack>
          )}
        </Stack>
    </Box>
  );
};

export default TaskView;
