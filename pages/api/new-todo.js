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
    }
    if(req.method==='DELETE'){
        const data = req.body;
        const client = await MongoClient.connect('mongodb+srv://ag25061999:w6yqhJ53ZPA7qz5R@cluster3.0ydqlvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3')
        const db = client.db()
        const todosCollection = db.collection('todo');
        const result = await todosCollection.deleteOne({_id: new MongoClient.ObjectId(id)});
        console.log(result);
        client.close();
        res.status(200).json({ message: 'Todo Deleted Successfully' });
    }
}

export default Handler;