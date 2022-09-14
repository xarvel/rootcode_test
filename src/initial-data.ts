export type TaskStatus =  'BACKLOG' | 'IN_PROGRESS' | 'DONE'

export type Task = {
    id: string,
    title: string,
    description: string
    status: TaskStatus
}

export const defaultTasks: Task[] = [
    { id: 'task-1', title: 'Task 1', description: 'Task 1 description', status: 'BACKLOG'},
    { id: 'task-2', title: 'Task 2', description: 'Task 2 description', status: 'BACKLOG'},
    { id: 'task-3', title: 'Task 3', description: 'Task 3 description', status: 'BACKLOG' },
    { id: 'task-4', title: 'Task 4', description: 'Task 4 description', status: 'BACKLOG'},
]
