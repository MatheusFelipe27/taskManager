import { Tag } from "./tagType"

export type priorityType = 'Alta' | 'Média' | 'Baixa'
export type statusType = 'Pendente' | 'Em andamento' | 'Concluída'

export interface TaskProps {
    id: number
    title: string
    description: string
    priority: priorityType
    status: statusType
    tag?: Tag[]
}