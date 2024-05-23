import { useState } from 'react';
import { useRouter } from 'next/router';
import TodoListForm from '@/Components/Todos/TodoListForm';
import Card from '@/Components/Ui/Card';
import TodoListComponent from '@/Components/Todos/TodoListComponent';
import { MongoClient } from 'mongodb';

export async function getServerSideProps() {
    const client = await MongoClient.connect('mongodb+srv://ag25061999:ww0gYijJ4Vmoo2kH@cluster3.0ydqlvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3');
    const db = client.db();
    const todosCollection = db.collection('todo');
    const todosResult = await todosCollection.find().toArray();
    client.close();

    return {
        props: {
            todos: todosResult.map((todo) => ({
                text: todo.text,
                id: todo._id.toString(),
                completed: todo.completed,
                status: todo.completed ? 'Completed' : 'Uncompleted',
            })),
        },
    };
}

const TodoPage = (props) => {
    const [todos, setTodos] = useState(props.todos || []);
    const router = useRouter();

    const addTodosHandler = async (todoData) => {
        const response = await fetch('/api/new-todo', {
            method: 'POST',
            body: JSON.stringify(todoData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const newTodo = await response.json();
            setTodos((prevTodos) => [...prevTodos, { ...todoData, id: newTodo.id }]);
        }
    };

    const deleteTodoHandler = async (todoId) => {
        const response = await fetch('/api/new-todo', {
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
        const todo = todos.find((todo) => todo.id === todoId);
        if (!todo) return;

        const updatedTodo = { ...todo, completed: !todo.completed, status: !todo.completed ? 'Completed' : 'Uncompleted' };

        const response = await fetch('/api/new-todo', {
            method: 'PUT',
            body: JSON.stringify(updatedTodo),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === todoId ? updatedTodo : todo)));
        }
    };

    return (
        <Card>
            <TodoListForm onAddTodos={addTodosHandler} />
            <TodoListComponent todos={todos} onDeleteTodo={deleteTodoHandler} onToggleTodo={toggleTodoHandler} />
        </Card>
    );
};

export default TodoPage;
