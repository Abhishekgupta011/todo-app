import React from "react";
import TodoItem from "./TodoItem";

const TodoListComponent = ({ todos, onDeleteTodo, onToggleTodo }) => {
    return (
        <ul>
            {todos.map((todo) => (
                todo.status === "Uncompleted" && (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        status={todo.status}
                        onDelete={() => onDeleteTodo(todo.id)}
                        onToggle={() => onToggleTodo(todo.id)}
                    />
                )
            ))}
        </ul>
    );
};

export default TodoListComponent;
