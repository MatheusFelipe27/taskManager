import React from "react";
import {
  Typography,
  Chip,
  Stack,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { TaskProps } from "@/types/taskType";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTaskStore } from "@/stores/useTaskStore";

interface TaskViewProps extends TaskProps {
  onEdit?: (task: TaskProps) => void;
}

const TaskView = ({id, title ,description, priority, status, tags, onEdit}: TaskViewProps) => {
  const removeTask = useTaskStore((state)=> state.removeTask)

  const deleteTask = (id:number) =>{
    removeTask(id)
  }

   const callUpdate = () => {
    if (onEdit) onEdit({ id, title, description, priority, status, tags });
  };

  return (
    <Box sx={{backgroundColor:'lightGray', padding:'10px', borderRadius:'12px'}}>
        <Stack spacing={1} width="100%">
          <Box sx={{display:'flex', width:'100%', alignItems:"center", justifyContent:'space-between'}}>
            <Typography variant="h6">{title}</Typography>
            <Box sx={{display:'flex'}}>
              <Tooltip title="Editar">
                <IconButton size="small" color="primary" onClick={callUpdate}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Excluir">
                <IconButton size="small" color="error" onClick={()=>deleteTask(id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Typography variant="body2">{description}</Typography>
          <Stack direction="row" spacing={2}>
            <Typography variant="body2"><strong>Priority:</strong> {priority}</Typography>
            <Typography variant="body2"><strong>Status:</strong> {status}</Typography>
          </Stack>
          {tags && tags.length > 0 && (
            <Stack direction="row" spacing={1} mt={0.5}>
              {tags?.map((tag) => (
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
