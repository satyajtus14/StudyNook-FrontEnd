import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({


    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    
       plugins: [
         jwtClient() 
    ]
   

})

export const { signIn, signUp, useSession } = authClient

/* export async function getAuthToken() {
  try {
    const { data: token } = await authClient.getToken();
    console.log("getToken result:", token);
    return token || null;
  } catch (err) {
    console.error("getAuthToken error:", err);
    return null;
  }
} */

  //  Robust token getter with fallback
export async function getAuthToken() {
  try {
    const { data: token } = await authClient.getToken();
    console.log("getToken result:", token);

    if (token) return token;

    const res = await fetch("/api/auth/token", {
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Token endpoint failed:", res.status);
      return null;
    }

    const data = await res.json();
    console.log("Direct token result:", data);
    return data?.token || null;

  } catch (err) {
    console.error("getAuthToken error:", err);
    return null;
  }
}