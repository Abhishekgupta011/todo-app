import { useRef } from "react";
import classes from './TodoListForm.module.css';
import Card from "../Ui/Card";
import AddIcon from '@mui/icons-material/Add';

const TodoList = (props) => {
    const todoInputRef = useRef();

    const todoSubmitHandler = (event) => {
        event.preventDefault();
        const enteredText = todoInputRef.current.value;
        if (enteredText.trim().length === 0) {
            return;
        }

        const newTodo = {
            text: enteredText,
            completed: false
        };
        props.onAddTodos(newTodo);
        todoInputRef.current.value = '';
    };

   

    return (
        <>
            <h1 className={classes.title}>Todo List</h1>
            
            <form onSubmit={todoSubmitHandler} className={classes.form}>
                <input 
                    type="text" 
                    name="text" 
                    id="todoinput" 
                    ref={todoInputRef} 
                    className={classes.text} 
                    placeholder="Add Items" 
                />
                <button type="submit" className={classes.addBtn}>
                    <span className={classes.addicon}><AddIcon/></span>
                </button>
            </form>
            
        </>
    );
}

export default TodoList;
