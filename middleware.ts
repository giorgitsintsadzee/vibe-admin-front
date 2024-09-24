import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ['/authorisation', '/register'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = cookies().get('token');
    const pathIsPublic = publicRoutes.includes(path);

    if (pathIsPublic && token) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (!token && !pathIsPublic) {
        return NextResponse.redirect(new URL('/authorisation', req.url))
    }
    if (!token && !pathIsPublic) {
        return NextResponse.redirect(new URL('/register', req.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.svg$).*)'],
}