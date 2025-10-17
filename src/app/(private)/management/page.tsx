"use client"
import Sidebar from "@/components/layout/sidebar/sidebar"
import CreateTaskCard from "@/components/layout/task/createTaskCard";
import TaskList from "@/components/layout/task/taskList";
import { Box } from "@mui/material"
import { styled } from "@mui/material/styles";
import { useState } from "react";

export type currentRouteType = "Tarefas" | "Criar" | "Tags";

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

  const [currentRoute, setCurrentRoute] = useState<currentRouteType>("Tarefas");
  
  return (
    <>
      <Box sx={{display:"flex"}}>
        <Sidebar currentRoute={currentRoute} setCurrentRoute={setCurrentRoute}/>
        <ContentBox>
          {
            currentRoute==="Criar" ?
            <CreateTaskCard/>
            :
            currentRoute==="Tarefas"?
            <TaskList/>
            :''
          }
        </ContentBox>
      </Box>
    </>      
  )
}

export default Page
