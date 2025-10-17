import { TaskProps } from "@/types/taskType";
import { create } from "zustand";

interface TaskStore {
  tasks: TaskProps[];
  addTask: (task: TaskProps) => void;
  updateTask: (updatedTask: TaskProps) => void;
  removeTask: (taskIndex: number) => void;
  loadTasks: () => void;

}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  addTask: (newTask) =>
    set((state) => {
      const updated = [...state.tasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  updateTask: (updatedTask: TaskProps) =>
    set((state) => {
      const updated = state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  removeTask: (taskIndex) =>
    set((state) => {
      const updated = state.tasks.filter((task) => task.id !== taskIndex);
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  loadTasks: () => {
    const stored = localStorage.getItem("tasks");
    set({ tasks: stored ? JSON.parse(stored) : [] });
  },
}));