import TodoList from "@/Components/Todos/TodoList";
import { Fragment } from "react";
import classes from './index.module.css'
const TodoPage = ()=>{
    return(
        <Fragment >
        <div className={classes.main}>
            <TodoList/>
        </div>
          
        </Fragment>
    )
}
export default TodoPage;