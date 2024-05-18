import { Fragment, useRef, useState } from "react";
import TodoItem from "./TodoItem";

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
        <Fragment>
            <h1>Todo List</h1>
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
            <form onSubmit={todoSubmitHandler}>
                <input type="text" name="text" id="todoinput" ref={todoInputRef} />
                <button type="submit">Add</button>
            </form>
        </Fragment>
    );
}

export default TodoList;
