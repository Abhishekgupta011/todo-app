import { Fragment } from "react";
import Card from "../Ui/Card";
import { classes } from './TodoItem.module.css'
const TodoItem = (props) => {
    return (
        <Card>
            <li className={` ${props.completed ? 'completed' : ''}`} style={{listStyle: 'none'}}>

            <input 
                    type="checkbox" 
                    checked={props.completed} 
                    onChange={props.onToggle} 
                />
                <span onClick={props.onToggle} style={{ textDecoration: props.completed ? 'line-through' : 'none' }}>
                    {props.text}
                </span>
                <button onClick={props.onDelete}>Delete</button>
            </li>
        </Card>
    );
}

export default TodoItem;
