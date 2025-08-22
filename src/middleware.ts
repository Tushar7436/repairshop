import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(
    async function middleware(request: NextRequest) {
        // If user is authenticated and trying to access the root page,
        // redirect them to the tickets page
        if (request.nextUrl.pathname === '/') {
            return Response.redirect(new URL('/tickets', request.url));
        }
    }, {
    isReturnToCurrentPage: true,
    // Add explicit redirect URLs
    afterSignIn: '/',
    afterSignUp: '/',
}
)

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - auth
         * - favicon.ico (favicon file)
         * - robots.txt
         * - images
         * - login
         * - homepage (represented with $ after beginning /)
         * - about
         */
        '/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|login|$|about).*)',
    ]
}