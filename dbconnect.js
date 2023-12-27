import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"


export async function getDatabase(collection) {
    try {
        const client = new MongoClient(uri);
        const database = client.db('bowdata');
        const bowdata = database.collection(collection);
        const result = await bowdata.find({}).toArray();
        client.close();
        return result;
    } catch (err) {
        console.log(`Something went wrong on connect`, err);
    };
};