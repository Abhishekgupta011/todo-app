import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

const TodoList = ({initialTodos}) => {
    const [todos, setTodos] = useState(initialTodos || []);
    useEffect(() => {
        console.log("Todos:", todos);
    }, [todos]);

    //setTodos((todo)=>(todo))
    const deleteTodoHandler = async (todoId) => {
        // Simulate API call
        const response = await fetch(`/api/new-todo`, {
            method: 'DELETE',
            body: JSON.stringify({ id: todoId }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
        }

    };

    const toggleTodoHandler = async (todoId) => {

        // Simulate API call
        const todo = todos.find((todo) => todo.id === todoId);
        if (!todo) {
            console.error(`Todo with ID ${todoId} not found`);
            return;
        }
        const updatedTodo = { ...todo, completed: !todo.completed , status: !todo.completed ? 'Completed' : 'Uncompleted'};

        const response = await fetch(`/api/new-todo`, {
            method: 'PUT',
            body: JSON.stringify(updatedTodo),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            setTodos((prevTodos) => prevTodos.map((todo) => todo.id === todoId ? updatedTodo : todo));
            console.log('updated')
        }

       
    };

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    completed={todo.completed}
                    status = {todo.status}
                    onDelete={() => deleteTodoHandler(todo.id)}
                    onToggle={() => toggleTodoHandler(todo.id)}
                />
            ))}
        </ul>
    );
};


export default TodoList;
