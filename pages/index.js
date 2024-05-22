import { useState } from "react";
import TodoList from "@/Components/Todos/TodoList";
import { useRouter } from "next/router";
import { MongoClient } from "mongodb";
import TodoListForm from "@/Components/Todos/TodoListForm";
import Card from "@/Components/Ui/Card";

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://ag25061999:w6yqhJ53ZPA7qz5R@cluster3.0ydqlvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3');
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

const TodoPage = ({ todos }) => {
    const [currentTodos, setCurrentTodos] = useState(todos);
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
            setCurrentTodos((prevTodos) => [...prevTodos, { ...todoData, id: newTodo.id }]);
            // No need to call router.push("/") here
        }
    };

    return (
        <Card>
            <TodoListForm onAddTodos={addTodosHandler} />
            <TodoList initialTodos={currentTodos} />
        </Card>
    );
};

export default TodoPage;
