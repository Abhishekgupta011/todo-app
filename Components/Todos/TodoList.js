import React, { useState } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

const TodoList = (props) => {
    const [todos, setTodos] = useState(props.initialTodos || []);

    const deleteTodoHandler = async (todoId) => {
        // Simulate API call
        // const response = await fetch(`/api/new-todo`, {
        //     method: 'DELETE',
        // });

        // if (response.ok) {
        //     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
        // }

        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    };

    const toggleTodoHandler = async (todoId) => {
        // Simulate API call
        // const todo = todos.find((todo) => todo.id === todoId);
        // const updatedTodo = { ...todo, completed: !todo.completed };

        // const response = await fetch(`/api/new-todo/${todoId}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(updatedTodo),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // });

        // if (response.ok) {
        //     setTodos((prevTodos) => prevTodos.map((todo) => todo.id === todoId ? updatedTodo : todo));
        // }

        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    completed={todo.completed}
                    onDelete={() => deleteTodoHandler(todo.id)}
                    onToggle={() => toggleTodoHandler(todo.id)}
                />
            ))}
        </ul>
    );
};



export default TodoList;
