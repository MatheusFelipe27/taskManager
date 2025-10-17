'use client'
import { taskSchema, TaskSchema } from '@/schemas/taskSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { LoginErrorTypography } from '../login/loginForm';
import { useTaskStore } from '@/stores/useTaskStore';
import TagComponent, { TagRef } from '@/components/ui/tag';
import { normalizeTask } from '@/utils/taskNormalize';

export const ContainerWrapper = styled(Paper)(({}) => ({
  display: "flex",
  width: "70%",
  height:'80%',
  borderRadius:'10px',
  overflow: "hidden",
  boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
  zIndex: 10,
  position:'relative',
  backgroundColor:'#EDE7F6',
  padding:"20px 40px",
  flexDirection:'column'
}));

const FormBox = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  flex: 1
}));

const ButtonCreate = styled(Button)(({})=>({
  backgroundColor: "#925FE2",
  color: "#fff",
  textTransform: "none",
  ":hover": {transform:'scale(1.05)'},
  maxWidth:'fit-content',
  alignSelf:'flex-end',
  marginTop:'auto'

}))

const CreateTaskCard = () => {
  const methods = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema)
  });
    const {
    register,
    formState: { errors }
  } = methods

  const addTask = useTaskStore((state)=> state.addTask)
  const taskSize = useTaskStore((state)=> state.tasks.length)
  const tagRef = React.useRef<TagRef>(null);


  const onSubmit = (data: TaskSchema) =>{
    const {title, description, priority, status} = data
    const tags = tagRef.current?.getSelectedTags() || [];
    const normalizedTask = normalizeTask(taskSize, title, description, priority, status, tags)

    addTask(normalizedTask)
    methods.reset({
      title: '',
      description: '',
      priority: '',
      status: '',
      tags: [],
    })
    tagRef.current?.reset();
  }

  return (
    <>
      <ContainerWrapper>
        <Typography variant="h5" sx={{ marginBottom: "16px", fontWeight: 600 }}>
          Crie sua tarefa
        </Typography>
        <FormProvider {...methods}>
          <FormBox onSubmit={methods.handleSubmit(onSubmit)}>
            <TextField
              {...register("title")}
              label="Título"
              name="title"
              variant="outlined"
            />
            {errors["title"] && (
              <LoginErrorTypography sx={{marginTop:'-20px'}}>
                {errors["title"]?.message}
              </LoginErrorTypography>
            )}

            <TextField
              {...register("description")}
              label="Descrição"
              name="description"
              variant="outlined"
              multiline
              rows={3}
            />
            {errors["description"] && (
              <LoginErrorTypography sx={{marginTop:'-20px'}}>
                {errors["description"]?.message}
              </LoginErrorTypography>
            )}

            <Controller
              name="priority"
              control={methods.control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Prioridade"
                >
                  <MenuItem value="Alta">Alta</MenuItem>
                  <MenuItem value="Média">Média</MenuItem>
                  <MenuItem value="Baixa">Baixa</MenuItem>
                </TextField>
              )}
            />
            {errors["priority"] && (
              <LoginErrorTypography sx={{marginTop:'-20px'}}>
                {errors["priority"]?.message}
              </LoginErrorTypography>
            )}

            <Controller
              name="status"
              control={methods.control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Status"
                >
                  <MenuItem value="Pendente">Pendente</MenuItem>
                  <MenuItem value="Em andamento">Em andamento</MenuItem>
                  <MenuItem value="Concluída">Concluída</MenuItem>
                </TextField>
              )}
            />
            {errors["status"] && (
              <LoginErrorTypography sx={{marginTop:'-20px'}}>
                {errors["status"]?.message}
              </LoginErrorTypography>
            )}
            <TagComponent errors={errors} ref={tagRef}/>
            <ButtonCreate
              type="submit"
              variant="contained"
            >
              Criar tarefa
            </ButtonCreate>
          </FormBox>  
        </FormProvider>
      </ContainerWrapper>
    </>      
  )
}

export default CreateTaskCard
