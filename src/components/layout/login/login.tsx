'use client'
import React from "react";
import { Box, Typography, Paper} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import LoginForm from "./loginForm";

const Container = styled(Box)(({}) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh",
  paddingTop:"5vh",
  paddingBottom:"5vh",
  background: "linear-gradient(to right, #1C1D21 50%, #925FE2 50%)",
}));

const LoginCard = styled(Paper)(({}) => ({
  display: "flex",
  width: "80%",
  height:'100%',
  borderRadius:'10px',
  overflow: "hidden",
  boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
  zIndex: 10,
  position:'relative',
  backgroundColor:'transparent'
}));

const LoginLeft = styled(Box)(({})=>({
  flex: 1,
  display: "flex",
  flexDirection:'column',
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:"#1C1D21",
}))

const LoginRight = styled(Box)(({})=>({
  flex: 1,
  display: "flex",
  flexDirection:'column',
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:"#925FE2",
  gap:"20px"
}))

const Login = () => {
  return (
    <Container>
      <LoginCard>
        <LoginLeft>
          <Box sx={{ width: "100%", display: "flex", marginLeft:"30%", flexDirection:'column', gap:'4px', color:'#f5f5f5'}}>
            <Typography variant="h5">Login</Typography>
            <Typography variant="caption">Insira os detalhes da sua conta</Typography>
          </Box>  
          <LoginForm/>  
        </LoginLeft>
        <LoginRight>
          <Box sx={{ width: "100%", display: "flex", marginLeft:"30%", flexDirection:'column', color:'#f5f5f5'}}>
            <Typography 
              variant="h2"
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  sm: '2rem',
                  md: '2.5rem',
                  lg: '3.5rem',
                }
              }}
            >
              Bem vindo ao Task Manager
            </Typography>
            <Typography variant="caption">Faça login para acessar sua conta</Typography>
          </Box>
          <Image
            src="/loginImage.svg"
            alt="login image"
            width={350}
            height={350}
          />
        </LoginRight>
      </LoginCard>
    </Container>
  );
};

export default Login;
