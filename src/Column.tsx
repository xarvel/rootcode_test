import React, {FC} from 'react';
import { Droppable } from 'react-beautiful-dnd';
import {Task} from './Task';
import {Box} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {Task as TaskType} from "./initial-data";


const useStyles = makeStyles((theme) => ({
    container: {
        margin: '8px',
        border: '1px solid lightgrey',
        borderRadius: '2px',
        width: '33%',
        display: 'flex',
        flexDirection: 'column',
    },
    task: {
        padding: '8px;',
        transition: 'background-color 0.2s ease',
        flexGrow: 1,
        minHeight: '100px',
    }
}));


type ColumnProps = {
    title: string
    tasks: any,
    id: string
}

export const Column:FC<ColumnProps> = ( {title, tasks, id}) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Typography variant="h2" component="h2">
                {title}
            </Typography>
            <Droppable
                droppableId={id}
            >
                {(provided, snapshot) => (
                    <Box
                        {...{ref: provided.innerRef} as any}
                        {...provided.droppableProps}
                        className={classes.task}
                    >
                        {tasks.map((task: TaskType, index: number) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </Box>
    )

}

