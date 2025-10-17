import { Tag } from "@/types/tagType";

export function normalizeTag(
  name: string,
  color: string,
  currentTagsQuantity: number
): Tag {
  return {
    id: currentTagsQuantity + 1,
    name,
    color,
  };
}
