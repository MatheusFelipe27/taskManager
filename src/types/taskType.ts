import { Tag } from "./tagType"


export interface TaskProps {
    id: number
    title: string
    description: string
    priority: string
    status: string
    tags?: Tag[]
}