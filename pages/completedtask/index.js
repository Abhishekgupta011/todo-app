import { useState, useEffect } from 'react';
import Card from '@/Components/Ui/Card';
import TodoItem from '@/Components/Todos/TodoItem';

const CompletedTasksPage = () => {
    const [completedTodos, setCompletedTodos] = useState([]);

    useEffect(() => {
        const fetchCompletedTodos = async () => {
            const response = await fetch('/api/new-todo');
            const data = await response.json();
            setCompletedTodos(data);
        };

        fetchCompletedTodos();
    }, []);

    return (
        <Card>
            <h1>Completed Tasks</h1>
            <ul>
                {completedTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        status={todo.status}
                        // No delete or toggle for completed tasks
                    />
                ))}
            </ul>
        </Card>
    );
};

export default CompletedTasksPage;
