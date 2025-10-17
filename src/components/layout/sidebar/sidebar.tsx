"use client";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useRouter } from "next/navigation";

const Aside = styled(Drawer)(({}) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "#925FE2",
  },
  
}));

const AsideBox = styled(Box)(({}) => ({
  width: "240px",
  padding: 20,
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledListItem = styled(ListItemButton)(
  ({ active }: { active?: boolean }) => ({
    "&:hover": {
      color: "#EDE7F6",
    },
    color: active ? "#EDE7F6" : "",
    backgroundColor: active ? "rgba(255,255,255,0.1)" : "transparent",
  })
);

const ButtonStyle = styled(Button)(({}) => ({
  "&:hover": {
    color: "#EDE7F6",
  },
  color: "black",
  cursor: "pointer",
  textTransform: "none",
}));

type currentRouteType = "Tarefas" | "Logs" | "Criar";

const Sidebar = () => {
  const [currentRoute, setCurrentRoute] = useState<currentRouteType>("Tarefas");
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
  };
  return (
    <>
      <Aside variant="permanent">
        <AsideBox>
          <Typography variant="h5">Task Manager</Typography>
          <List>
            <StyledListItem
              active={currentRoute === "Criar"}
              sx={{ marginBottom: "40px" }}
              onClick={() => setCurrentRoute("Criar")}
            >
              <ListItemText primary="Criar Tarefa" />
              <ListItemIcon>
                <AddCircleOutlinedIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
            </StyledListItem>
            <StyledListItem
              active={currentRoute === "Tarefas"}
              onClick={() => setCurrentRoute("Tarefas")}
            >
              <ListItemText primary="Tarefas" />
            </StyledListItem>
            <StyledListItem
              active={currentRoute === "Logs"}
              onClick={() => setCurrentRoute("Logs")}
            >
              <ListItemText primary="Logs de Tarefas" />
            </StyledListItem>
          </List>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Imagem do usuário"
              src="https://github.com/MatheusFelipe27.png"
            />
            <ButtonStyle onClick={logout}>Sair</ButtonStyle>
          </Box>
        </AsideBox>
      </Aside>
    </>
  );
};

export default Sidebar;
