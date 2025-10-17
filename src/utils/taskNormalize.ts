import { Tag } from "@/types/tagType";
import {TaskProps } from "@/types/taskType";

export function normalizeTask(
  currentTaskQuantity: number,
  title: string,
  description: string,
  priority: string,
  status: string,
  tags?: Tag[],
): TaskProps {
  return {
    id: currentTaskQuantity + 1,
    title,
    description,
    priority,
    status,
    created_at: new Date().toISOString(),
    tags,
  };
}
