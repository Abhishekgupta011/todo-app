import { Fragment, useRef, useState } from "react";
import TodoItem from "./TodoItem";
import classes from './TodoList.module.css';
import Card from "../Ui/Card";
import AddIcon from '@mui/icons-material/Add';
const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const todoInputRef = useRef();

    const todoSubmitHandler = (event) => {
        event.preventDefault();
        const enteredText = todoInputRef.current.value;
        if (enteredText.trim().length === 0) {
            return;
        }

        const newTodo = {
            text: enteredText,
            id: Math.random().toString(),
            completed: false
        };

        setTodos((prevTodos) => [...prevTodos, newTodo]);
        todoInputRef.current.value = '';
    };

    const deleteTodoHandler = (todoId) => {
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== todoId));
    };

    const toggleTodoHandler = (todoId) => {
        setTodos((prevTodos) => prevTodos.map(todo =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <Card className={classes.container}>
            <h1 className={classes.title}>Todo List</h1>
            
            <form onSubmit={todoSubmitHandler} className={classes.form}>
                <input type="text" 
                name="text" 
                id="todoinput" 
                ref={todoInputRef} 
                className={classes.text} 
                placeholder="Add Items"/>
                <button type="submit" className={classes.addBtn} ><span className={classes.addicon}><AddIcon/></span></button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        onDelete={() => deleteTodoHandler(todo.id)}
                        onToggle={() => toggleTodoHandler(todo.id)}
                    />
                ))}
            </ul>
        </Card>
    );
}

export default TodoList;
