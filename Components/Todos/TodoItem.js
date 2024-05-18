import { Fragment } from "react";
import { classes } from './TodoItem.module.css';
const TodoItem = (props) => {
    return (
        <Fragment>
            <li className={`list-group-item d-flex justify-content-between ${props.completed ? `${classes.completed}` : ''}`}> 

                <span onClick={props.onToggle} style={{ textDecoration: props.completed ? 'line-through' : 'none' }}>
                    {props.text}
                </span>
                <button onClick={props.onDelete}>Delete</button>
            </li>
        </Fragment>
    );
}

export default TodoItem;
