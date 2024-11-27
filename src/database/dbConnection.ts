import { MongoClient } from "mongodb";

export default async function connect(stringConnection: any){
    let mongoClient;

    try {

        mongoClient = new MongoClient(stringConnection);
        console.log("Connecting to cluster of the database...");
        await mongoClient.connect();
        console.log("CONNECTED to cluster");
        
        return mongoClient;

    } catch (error) {
        console.log("Failed to connect!", error);
        process.exit();
    }
}