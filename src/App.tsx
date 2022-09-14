import React, {useState, FC, useCallback} from 'react';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import {Column} from './Column';
import {Box} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex'
    },
}));

export const App:FC = () => {
    const [tasks, setTasks] = useState<any>(initialData)
    const classes = useStyles()

    const handleDragEnd = useCallback((result: any) => {
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

        const home = tasks.columns[source.droppableId as any] as any;
        const foreign = tasks.columns[destination.droppableId as any] as any;

        if (home === foreign) {
            const newTaskIds = Array.from(home.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newHome = {
                ...home,
                taskIds: newTaskIds,
            };

            const newState = {
                ...tasks,
                columns: {
                    ...tasks.columns,
                    [newHome.id]: newHome,
                },
            };

            setTasks(newState);
            return;
        }

        // moving from one list to another
        const homeTaskIds = Array.from(home.taskIds);
        homeTaskIds.splice(source.index, 1);
        const newHome = {
            ...home,
            taskIds: homeTaskIds,
        };

        const foreignTaskIds = Array.from(foreign.taskIds);
        foreignTaskIds.splice(destination.index, 0, draggableId);
        const newForeign = {
            ...foreign,
            taskIds: foreignTaskIds,
        };

        const newState = {
            ...tasks,
            columns: {
                ...tasks.columns,
                [newHome.id]: newHome,
                [newForeign.id]: newForeign,
            },
        };

        setTasks(newState);
    },[tasks]);


    return (
        <DragDropContext
            onDragEnd={handleDragEnd}
        >
            <Box className={classes.container}>
                {tasks.columnOrder.map((columnId: string) => {
                    const column = tasks.columns[columnId];
                    const tasksByColumn = column.taskIds.map(
                        (taskId: string) => tasks.tasks[taskId],
                    );

                    return (
                        <Column
                            key={column.id}
                            title={column.title}
                            id={column.id}
                            tasks={tasksByColumn}
                        />
                    );
                })}
            </Box>
        </DragDropContext>
    )

}
