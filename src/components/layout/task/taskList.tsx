import React, { useState } from 'react'
import { ContainerWrapper } from './createTaskCard'
import FilterSelect from './filterSelect'
import { Box, TablePagination, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import TaskView from './taskView'
import { useTaskStore } from '@/stores/useTaskStore'

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
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem('taskFilters');
    return savedFilters
      ? JSON.parse(savedFilters)
      : { status: "Todos os status", priority: "Todas as prioridades" };
  });
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

  const paginatedTasks = filteredTasks.slice(
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
              sx={{width:'60%'}}
              size="small"
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
                tag={task.tag}
              />
            ))
          ) : (
            <EmptyList message="Nenhuma tarefa encontrada" />
          )}
        </TaskListContainer>
        </Box>
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
      </ContainerWrapper>
    </>      
  )
}

export default TaskList
