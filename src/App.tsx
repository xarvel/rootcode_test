import React, {useState, FC, useCallback, useMemo} from 'react';
import '@atlaskit/css-reset';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import {Column} from './Column';
import {Box} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {defaultTasks, TaskStatus} from "./initial-data";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex'
    },
}));

export const App:FC = () => {
    const [tasks, setTasks] = useState(defaultTasks)
    const classes = useStyles()

    const handleDragEnd = useCallback((result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        setTasks(tasks => tasks.map(task => {
            if(task.id === draggableId){
                return {
                    ...task,
                    status: destination.droppableId as TaskStatus
                }
            }

            return task
        }))

    },[tasks]);

    const backlogTasks = useMemo(() => tasks.filter(task => task.status === 'BACKLOG'), [tasks]);
    const doneTasks = useMemo(() => tasks.filter(task => task.status === 'DONE'), [tasks]);
    const inProgressTasks = useMemo(() => tasks.filter(task => task.status === 'IN_PROGRESS'), [tasks]);

    return (
        <DragDropContext
            onDragEnd={handleDragEnd}
        >
            <Box className={classes.container}>
                <Column
                    title={'Backlog'}
                    status='BACKLOG'
                    tasks={backlogTasks}
                />
                <Column
                    title={'In Progress'}
                    status={'IN_PROGRESS'}
                    tasks={inProgressTasks}
                />
                <Column
                    title={'Done'}
                    status='DONE'
                    tasks={doneTasks}
                />
            </Box>
        </DragDropContext>
    )

}
