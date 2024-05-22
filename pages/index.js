import { Fragment } from "react";
import TodoList from "@/Components/Todos/TodoList";
import classes from './index.module.css';
import { useRouter } from "next/router";
import { MongoClient } from "mongodb";
import TodoListForm from "@/Components/Todos/TodoListForm";
import Card from "@/Components/Ui/Card";


export async function getStaticProps() {
    // Here you can fetch data from an API, database, or prepare static data
    const client = await MongoClient.connect('mongodb+srv://ag25061999:w6yqhJ53ZPA7qz5R@cluster3.0ydqlvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3')
        const db = client.db()
        const todosCollection = db.collection('todo');
        const todosResult = await todosCollection.find().toArray();
        console.log(todosResult);
        client.close();

    return {
        props: {
            todos: todosResult.map((todo)=>({
                text: todo.text,
                id: todo._id.toString(),
                completed: todo.completed,

            })),
        },
    };
}

const TodoPage = (props) => {
    const router = useRouter();
    const addTodosHandler = async (todoData)=>{
    
        console.log(todoData);
        const response = await fetch('/api/new-todo',{
            method:'POST',
            body: JSON.stringify(todoData),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            const data = await response.json();
            console.log(data)
            router.push("/")
    }
    return (
        <Card>
            <TodoListForm onAddTodos={addTodosHandler}/>
            <TodoList 
                initialTodos={props.todos} 
            />        
        </Card>
    );
};

export default TodoPage;
