import { Fragment } from 'react';
import classes from './TodoItem.module.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const TodoItem = ({  text, completed, status, onDelete, onToggle }) => {
    return (
        <Fragment>
            <li className={classes.list} >
                <div className={classes.listContainer}>
                    <div>
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={onToggle}
                        />
                        <span onClick={onToggle}>
                            {text}
                        </span>
                        </div>
                        <div className={classes.status}>
                        <span className={status === "Uncompleted" ? classes.uc : classes.c}>{status}</span>

                    </div>
                    <button onClick={onDelete} className={classes.dltBtn}>
                        <span className={classes.dltIcon}><DeleteOutlineIcon /></span>
                    </button>
                </div>
            </li>
        </Fragment>
    );
};

export default TodoItem;
