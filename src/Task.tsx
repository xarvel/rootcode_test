import React, {FC} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {Task as TaskType} from './initial-data';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type TaskProps = {
    task: TaskType
    index: number
}

const useStyles = makeStyles((theme) => ({
    task: {
        border: '1px solid lightgrey',
        borderRadius:'2px;',
        padding: '8px;',
        marginBottom: '8px;',
        backgroundColor:  'white',
    },
}));

export const Task:FC<TaskProps> = ({ task, index}) => {
    const classes = useStyles();
    return (
        <Draggable
            draggableId={task.id}
            index={index}
        >
            {(provided, snapshot) => (
                <Box
                    className={classes.task}
                    {...provided.draggableProps}
                    {...{ref: provided.innerRef} as any}
                    {...provided.dragHandleProps}
                >
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {task.title}
                        </Typography>

                        <Typography variant="body2" component="p">
                            {task.description}
                        </Typography>
                    </CardContent>
                </Box>
            )}
        </Draggable>
    );
}
