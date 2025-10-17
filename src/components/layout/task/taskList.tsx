import React, { useEffect, useState } from 'react'
import CreateTaskCard, { ContainerWrapper } from './createTaskCard'
import FilterSelect from './filterSelect'
import { Box, IconButton, Modal, TablePagination, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import TaskView from './taskView'
import { useTaskStore } from '@/stores/useTaskStore'
import { TaskProps } from '@/types/taskType'
import CloseIcon from "@mui/icons-material/Close";


  const FilterBox = styled(Box)(({})=>({
    display:'flex',
    alignItems:"center",
    justifyContent:'space-between'
  }))

  const SearchField = styled(TextField)(({})=>({
    '& .MuiInputLabel-root': {
      fontSize:'12px',
    },
  }))

  const TaskListContainer = styled(Box)(({}) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    overflowY: 'auto',
    maxHeight: '65vh',
    paddingRight: '8px',
  }));

  const EmptyList = ({ message }: { message: string }) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        color: '#1C1D21',
        fontSize: '20px',
        fontWeight: 500,
      }}
    >
      {message}
    </Box>
  );



const TaskList = () => {
  const [filters, setFilters] = useState({
    status: 'Todos os status',
    priority: 'Todas as prioridades',
  })

  const [sortOption, setSortOption] = useState<'none' | 'created_at' | 'priority'>('none');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFilters = localStorage.getItem('taskFilters')
      if (savedFilters) {
        setFilters(JSON.parse(savedFilters))
      }
    }
  }, [])
  
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageQuantity, setPageQuantity] = useState<number>(5);

  const [searchValue, setSearchValue] = useState<string>("");
  const tasks = useTaskStore((state) => state.tasks); 

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filters.status === 'Todos os status' || task.status === filters.status;
    const priorityMatch =
      filters.priority === 'Todas as prioridades' || task.priority === filters.priority;
    const searchMatch = task.title.toLowerCase().includes(searchValue.toLowerCase());
    return statusMatch && priorityMatch && searchMatch;
  })

  const sortChange = (value: string) => {
    if (value === "Mais recentes") setSortOption("created_at");
    if (value === "Por prioridade") setSortOption("priority");
    if (value === 'Sem ordenação') setSortOption('none');
  };

  const getSortLabel = (value: 'none' | 'created_at' | 'priority') => {
    switch (value) {
      case 'created_at':
        return 'Mais recentes';
      case 'priority':
        return 'Por prioridade';
      case 'none':
      default:
        return 'Sem ordenação';
    }
  };

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === 'priority') {
      const priorityOrder: Record<string, number> = { 'Alta': 3, 'Média': 2, 'Baixa': 1 };
      return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    } else if (sortOption === 'created_at') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return 0;
  });

  const paginatedTasks = sortedTasks.slice(
    currentPage * pageQuantity,
    currentPage * pageQuantity + pageQuantity
  );

  const ChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const ChangePageQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageQuantity(parseInt(event.target.value, 10));
    setCurrentPage(0); 
  };

  const persistenceFilterChange = (type: 'status' | 'priority', value: string) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    localStorage.setItem('taskFilters', JSON.stringify(newFilters));
  };

  const [editingTask, setEditingTask] = useState<TaskProps | null>(null);

  return (
    <>
      <ContainerWrapper>
        <Box sx={{display:'flex', flexDirection:'column',gap:'40px'}}>
          <FilterBox>
            <SearchField
              label="Buscar Tarefa"
              variant="outlined"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              sx={{width:'40%'}}
              size="small"
            />
            <FilterSelect
              initialState={getSortLabel(sortOption)}
              onChange={sortChange}
              options={["Sem ordenação","Mais recentes", "Por prioridade"]}
            />
            <FilterSelect
              initialState={filters.status}
              onChange={(val) => persistenceFilterChange('status', val)}
              options={["Todos os status", "Pendente", "Em andamento", "Concluída"]}
            />
            <FilterSelect
              initialState={filters.priority}
              onChange={(val) => persistenceFilterChange('priority', val)}
              options={["Todas as prioridades","Baixa", "Média", "Alta"]}
            />
          </FilterBox>
        <TaskListContainer>
          {paginatedTasks.length > 0 ? (
            paginatedTasks.map((task) => (
              <TaskView
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                status={task.status}
                tags={task.tags}
                created_at={task.created_at}
                onEdit={(task) => setEditingTask(task)}
              />
            ))
          ) : (
            <EmptyList message="Nenhuma tarefa encontrada" />
          )}
        </TaskListContainer>
        </Box>
      {paginatedTasks.length>0 && 
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
          <TablePagination
            component="div"
            count={filteredTasks.length}
            page={currentPage}
            onPageChange={ChangePage}
            rowsPerPage={pageQuantity}
            onRowsPerPageChange={ChangePageQuantity}
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage="Tarefas por página"
          />
        </Box>
      }
      </ContainerWrapper>
      <Modal open={!!editingTask} onClose={() => setEditingTask(null)}>
         <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            display: "inline-block",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <IconButton
            onClick={() => setEditingTask(null)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          {editingTask && (
            <CreateTaskCard
              type="Edit"
              taskToEdit={editingTask}
              onClose={() => setEditingTask(null)}
            />
          )}
        </Box>
      </Modal>
    </>      
  )
}

export default TaskList
