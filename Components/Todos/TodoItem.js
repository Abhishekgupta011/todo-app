import { Fragment } from "react";
import classes from './TodoItem.module.css'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const TodoItem = (props) => {
    return (
        <Fragment>
            <li className={classes.list}>
            <div className={classes.listContainer}>
            <div>
            <input 
                    type="checkbox" 
                    checked={props.completed} 
                    onChange={props.onToggle} 
                />
                
                <span onClick={props.onToggle} style={{ textDecoration: props.completed ? 'line-through' : 'none' }}>
                    {props.text}
                </span>
                </div>
                <button onClick={props.onDelete} className={classes.dltBtn}><span className={classes.dltIcon}><DeleteOutlineIcon/></span></button>
                </div>
                
            </li>
        </Fragment>
    );
}

export default TodoItem;
