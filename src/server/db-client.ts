import { MongoClient } from "mongodb";
import 'dotenv/config'

export const client = new MongoClient(process.env.MONGO_DB_CONNECTION || "default").db("mind-web").collection("notes")