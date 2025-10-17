import { Tag } from "@/types/tagType";
import { priorityType, statusType, TaskProps } from "@/types/taskType";

export function normalizeTask(
  currentTaskQuantity: number,
  title: string,
  description: string,
  priority: priorityType,
  status: statusType,
  tag?: Tag[],
): TaskProps {
  return {
    id: currentTaskQuantity + 1,
    title,
    description,
    priority,
    status,
    tag
  };
}
