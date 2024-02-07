import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose';



export default async function middleware(req: NextRequest) {    
    const adminRoutes = ['/api/products', '/api/categories'];
    const matchesAdminRoute = adminRoutes.some(route => req.nextUrl.pathname.startsWith(route));
    // const userRoles = ['user', 'admin'];

    // Admin protected routes
    // if (matchesAdminRoute && ['POST', 'PATCH', 'DELETE'].includes(req.method)) {
    //     let token: string | undefined;
    //     if (req.headers.get('authorization') && req.headers.get('authorization')?.startsWith('Bearer')) {
    //         token = req.headers.get('authorization')?.split(' ')[1];
    //     } else {
    //         token = req.cookies.get('jwt')?.value || '';
    //     }
    //     const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
    //     const decoded: any = await jose.jwtVerify(token as string, secret);
    //     const { role } = decoded?.payload;
        

    //     if (role !== 'admin') {
    //         return NextResponse.redirect(new URL ('/api/auth/unauthorized', req.nextUrl), 303)
    //     }
    // }

    // User protected routes 
    // const userRoutes = ['/api/auth/logout'];
    // const matchesUserRoute = userRoutes.some(route => req.nextUrl.pathname.startsWith(route)); 
    // if (matchesUserRoute && ['POST', 'PATCH', 'DELETE'].includes(req.method)) {
    //     if (role !== 'user') {
    //         return NextResponse.redirect(new URL ('/api/auth/unauthorized', req.nextUrl), 303)
    //     }
    // }


    // Guest routes
    return NextResponse.next();
}




export const config = {
    matcher: [
        '/api/auth/logout',
        '/api/products/:path*', 
        '/api/categories/:path*',
    ]
};