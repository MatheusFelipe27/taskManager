'use client'
import { useEffect } from "react";
import { useTaskStore } from "@/stores/useTaskStore";
import { useTagStore } from "@/stores/useTagStore";

export default function ClientLoader() {
  useEffect(() => {
    useTaskStore.getState().loadTasks();
    useTagStore.getState().loadTags();
  }, []);

  return null
}
