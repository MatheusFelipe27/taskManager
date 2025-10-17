'use client'
import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { tagSchema, TagSchema } from '@/schemas/tagSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginErrorTypography } from '../login/loginForm';
import { useTagStore } from '@/stores/useTagStore';
import { normalizeTag } from '@/utils/tagNormalize';

const TaskCard = styled(Box)(({}) => ({
  display: "flex",
  width: "400px",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
  zIndex: 10,
  position: "relative",
  backgroundColor: "#EDE7F6",
  padding: "20px 40px",
  flexDirection: "column",
}));

const FormBox = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const ButtonCreate = styled(Button)(({}) => ({
  backgroundColor: "#925FE2",
  color: "#fff",
  textTransform: "none",
  ":hover": { transform: "scale(1.05)" },
  alignSelf: "flex-end",
}));

const HeaderBox = styled(Box)(({})=>({
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center", 
}))

interface CreateTagModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, color: string) => void;
}

const CreateTagModal = ({ open, onClose, onCreate }: CreateTagModalProps) => {
  const methods = useForm<TagSchema>({
    resolver: zodResolver(tagSchema),
  });
    const {
    register,
    reset,
    formState: { errors }
  } = methods
  const [tagNameError, setTagNameError] = useState<boolean>(false)

  useEffect(() => {
    if(open){
      setTagNameError(false)
      reset({ name: "", color: "#925FE2" });
    }
  }, [open, reset]);

  const addTag = useTagStore((state)=> state.addTag)
  const tagSize = useTagStore((state)=> state.tags.length)
  const tags = useTagStore((state)=> state.tags)


  const onSubmit = (data: TagSchema) => {
    const {name, color} = data
    const normalizedTag = normalizeTag(name, color, tagSize)
    const tagAlreadyExists = tags.some((existingTag) => existingTag.name.toLowerCase() === name.toLowerCase())
    if(tagAlreadyExists){
      setTagNameError(true)
      return
    }
    addTag(normalizedTag)
    onCreate(name, color);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <TaskCard>
          <HeaderBox>
            <Typography variant="h5" sx={{ marginBottom: "16px", fontWeight: 500 }}>
              Criar nova tag
            </Typography>
            <IconButton onClick={onClose} size="small" sx={{marginBottom:'10px'}}>
              <CloseIcon />
            </IconButton>
          </HeaderBox>
          <FormProvider {...methods}>
            <FormBox onSubmit={methods.handleSubmit(onSubmit)}>
              <TextField
                {...register("name")}
                label="Nome da Tag"
                onChange={()=> setTagNameError(false)}
              />
              {errors["name"] && (
                <LoginErrorTypography sx={{marginTop:'-20px'}}>
                  {errors["name"]?.message}
                </LoginErrorTypography>
              )}
              {tagNameError && (
                <LoginErrorTypography sx={{marginTop:'-20px'}}>
                  Já existe uma tag com esse nome.
                </LoginErrorTypography>
              )}
              <TextField
                {...register("color")}
                label="Cor da Tag"
                type="color"
              />
              {errors["color"] && (
                <LoginErrorTypography sx={{marginTop:'-20px'}}>
                  {errors["color"]?.message}
                </LoginErrorTypography>
              )}
              <ButtonCreate type="button" variant="contained"
                onClick={methods.handleSubmit(onSubmit)}
              >
                Criar tag
              </ButtonCreate>
            </FormBox>
          </FormProvider>
        </TaskCard>
      </Box>
    </Modal>
  );
};

export default CreateTagModal;
