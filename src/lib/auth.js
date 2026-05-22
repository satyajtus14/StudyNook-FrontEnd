import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("studynook-db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    
    client
  }),

  emailAndPassword: {    
        enabled: true,
    },

    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
    session: {
        cookieCache:{
            enabled: true,
            // strategy: "jwt",
            maxAge: 7 * 24 * 60 * 60, // 7 days
        }
    }, 

    // plugins: [
    //   jwt()
    // ]
    plugins: [
    jwt({
      jwt: {
        expirationTime: "7d",
      },
      jwks: {
        keyPairConfig: {
          alg: "RS256",
        },
      },
    }),
  ],

});