
export type Task = {
    id: string,
    title: string,
    description: string
}

const initialData = {
    tasks: {
        'task-1': { id: 'task-1', title: 'Task 1', description: 'Task 1 description' },
        'task-2': { id: 'task-2', title: 'Task 2', description: 'Task 2 description'},
        'task-3': { id: 'task-3', title: 'Task 3', description: 'Task 3 description'},
        'task-4': { id: 'task-4', title: 'Task 4', description: 'Task 4 description'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Backlog',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: [],
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
