import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { role } from "better-auth/client";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("resell_hub_db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "Buyer",
        required: true,
      },
      profile: {
        type: "string",
        input: true,
      },
      phone: {
        type: "string",
        required: false,
      },
      address: {
        type: "string",
        required: false,
      },
      accountStatus: {
        type: "string",
        required: false,
        defaultValue: "active",
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 24 * 30,
      strategy: "jwt",
    },
  },
  plugins: [jwt()],
});
