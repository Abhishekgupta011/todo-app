import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://ag25061999:ww0gYijJ4Vmoo2kH@cluster3.0ydqlvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3';
let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();
    }
    return client.db();
}

export default async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('todo');

    if (req.method === 'POST') {
        const { text, completed, status } = req.body;
        const result = await collection.insertOne({ text, completed, status });
        res.status(201).json({ id: result.insertedId.toString() });
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({ message: 'Deleted successfully' });
    } else if (req.method === 'PUT') {
        const { id, text, completed, status } = req.body;
        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { text, completed, status } }
        );
        res.status(200).json({ message: 'Updated successfully' });
    }  else if (req.method === 'GET') {
        const completedTodos = await collection.find({ status: 'Completed' }).toArray();
        res.status(200).json(completedTodos.map(todo => ({
            id: todo._id.toString(),
            text: todo.text,
            completed: todo.completed,
            status: todo.status,
        })));
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
