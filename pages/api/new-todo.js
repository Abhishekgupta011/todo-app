import { MongoClient, ObjectId } from "mongodb";

const Handler = async(req , res)=>{
    if(req.method ==="POST"){
        const data = req.body;
        const client = await MongoClient.connect('mongodb+srv://ag25061999:w6yqhJ53ZPA7qz5R@cluster3.0ydqlvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3')
        const db = client.db()
        const todosCollection = db.collection('todo');
        const result = await todosCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(200).json({message: 'Todo Added Successfully' , result: result})
    } else if (req.method === "PUT") {
        const data = req.body;
        const client = await MongoClient.connect('mongodb+srv://ag25061999:w6yqhJ53ZPA7qz5R@cluster3.0ydqlvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3');
        const db = client.db();
        const todosCollection = db.collection('todo');
        const result = await todosCollection.updateOne({ _id: new ObjectId(data.id) }, { $set: {completed : data.completed , status:data.status} });
        client.close();
        res.status(200).json({ message: 'Todo Updated Successfully', result });
    }else if (req.method === "DELETE") {
        const data = req.body;
        const client = await MongoClient.connect('mongodb+srv://ag25061999:w6yqhJ53ZPA7qz5R@cluster3.0ydqlvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3');
        const db = client.db();
        const todosCollection = db.collection('todo');
        const result = await todosCollection.deleteOne({ _id: new ObjectId(data.id) });
        client.close();
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Todo Deleted Successfully' });
        } else {
            res.status(404).json({ message: 'Todo Not Found' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
    
}

export default Handler;