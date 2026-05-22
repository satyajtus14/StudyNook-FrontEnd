import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers';
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        console.log(">>> No session found, redirecting to /login");
        return NextResponse.redirect(new URL('/login', request.url))
    }
  
    return NextResponse.next()
  
}
 
export const config = {
  matcher: ['/my-listings', '/my-bookings', '/add-room/:path*', '/rooms/:id/'],
}