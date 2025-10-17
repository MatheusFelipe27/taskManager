import { loginInputSchema, LoginInputSchema } from '@/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import { FormProvider, useForm} from 'react-hook-form';

const Form = styled("form")({
  width:'70%',
  display: "flex",
  flexDirection: "column",
});

const LoginButton = styled(Button)(({})=>({
  backgroundColor:'#925FE2',
  ":hover":{
    transform:'scale(1.05)'
  }
}))

const LoginTextField = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    color: "#797A7E"
  },
  '& label': {
    color: "#797A7E"
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: "#797A7E"
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: "#797A7E"
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: "#797A7E"
  },

  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px #1C1D21 inset',
    WebkitTextFillColor: "#797A7E"
  },
}));

const LoginErrorTypography = styled("span")(() => ({
  fontSize: "12px",
  color: "#fca5a5"
}));

const LoginForm = () => {
  const methods = useForm<LoginInputSchema>({
    resolver: zodResolver(loginInputSchema),
  });
   const {
    register,
    watch,
    clearErrors,
    formState: { errors }
  } = methods

  const userValue = watch("user")
  const passwordValue = watch("password")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(true)

  const onSubmit = async () => {
    setIsLoading(true)
    try{
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userValue, password: passwordValue }),
      })
      const data = await res.json();

      if(res.ok && data.success){
        redirect("/management")
      }
      else{
        setLoginError(true)
      }
    }
    finally{
      setIsLoading(false)
    }
  }
  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <LoginTextField
            {...register("user")}
            label="Usuário"
            type="text"
            variant="standard"
            margin="normal"
            onChange={(e) => {
              setLoginError(false)
              clearErrors("user")
              register("user").onChange(e)
            }}
          />
          {errors["user"] && (
            <LoginErrorTypography>
              {errors["user"]?.message}
            </LoginErrorTypography>
          )}
          <LoginTextField
            {...register("password")}
            label="Senha"
            type={showPassword?"password": "text"}
            variant="standard"
            margin="normal"
            onChange={(e) => {
              setLoginError(false)
              clearErrors("password")
              register("password").onChange(e)
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={()=> setShowPassword((prev: boolean) => !prev)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <Visibility sx={{ color: "#797A7E" }} /> : <VisibilityOff sx={{ color: "#797A7E" }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors["password"] && (
            <LoginErrorTypography>
              {errors["password"]?.message}
            </LoginErrorTypography>
          )}
          {loginError && (
            <LoginErrorTypography>
              Usuário ou senha inválidos
            </LoginErrorTypography>
          )}
          <LoginButton type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
          </LoginButton>
        </Form>    
      </FormProvider>
    </>      
  )
}

export default LoginForm
