"use client"
import Sidebar from "@/components/layout/sidebar/sidebar"
import { Box } from "@mui/material"
import { styled } from "@mui/material/styles";

const Page = () => {

const ContentBox = styled(Box)(({}) => ({
  display:"flex",
  flexGrow: 1,          
  marginLeft: "280px",            
  height: "100vh",       
  backgroundColor: "#1C1D21"
}));
  
  return (
    <>
      <Box sx={{display:"flex"}}>
        <Sidebar/>
        <ContentBox>
          <h2 style={{color:'#f9f9f9'}}>CONTEUDO</h2>
        </ContentBox>
      </Box>
    </>      
  )
}

export default Page
