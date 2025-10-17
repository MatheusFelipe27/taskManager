import { Tag } from "@/types/tagType";
import { create } from "zustand";

interface TagStore {
  tags: Tag[];
  addTag: (tag: Tag) => void;
  updateTag: (index: number, newTag: Tag) => void;
  removeTag: (index: number) => void;
  loadTags: () => void
}

export const useTagStore = create<TagStore>((set) => ({
  tags: [],

  addTag: (newTag) =>
    set((state) => {
      const updated = [...state.tags, newTag];
      localStorage.setItem("tags", JSON.stringify(updated));
      return { tags: updated };
    }),

  updateTag: (tagIndex, updatedTag) =>
    set((state) => {
      const updated = state.tags.map((tag) =>
        tag.id === tagIndex ? updatedTag : tag
      );
      localStorage.setItem("tags", JSON.stringify(updated));
      return { tags: updated };
    }),

  removeTag: (tagIndex) =>
    set((state) => {
      const updated = state.tags.filter((tag) => tag.id !== tagIndex);
      localStorage.setItem("tags", JSON.stringify(updated));
      return { tags: updated };
    }),

  loadTags: () => {
    const stored = localStorage.getItem("tags");
    set({ tags: stored ? JSON.parse(stored) : [] });
  },
}));