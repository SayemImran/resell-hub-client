import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { role } from "better-auth/client";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("resell_hub_db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword:{
    enabled:true,
  },
  user:{
    additionalFields:{
      role:{
        type:"string",
        defaultValue:"Buyer",
        required:true,
      },
      profile:{
        type:"string",
      }
    }
  }
});