"use client"
import Sidebar from "@/components/layout/sidebar/sidebar"
import CreateTaskCard from "@/components/layout/task/createTaskCard";
import { Box } from "@mui/material"
import { styled } from "@mui/material/styles";

const Page = () => {

const ContentBox = styled(Box)(({}) => ({
  display:"flex",
  alignItems:'center',
  justifyContent:'center',
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
          <CreateTaskCard/>
        </ContentBox>
      </Box>
    </>      
  )
}

export default Page
