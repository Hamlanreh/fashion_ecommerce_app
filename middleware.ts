import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@app/_libs/auth";



export default async function middleware(req: NextRequest) {    
    let token: string | undefined;
    if (req.headers.get('authorization') && req.headers.get('authorization')?.startsWith('Bearer')) {
        token = req.headers.get('authorization')?.split(' ')[1];
    } else {
        token = req.cookies.get('token')?.value || '';
    }

    const verifiedToken: any = token && (await verifyJwtToken(req, token));
    const authRoutes = ['/api/auth/login'];
    const adminRoutes = ['/api/products', '/api/categories'];
    const userRoutes = ['/api/auth/logout'];
    const isAuthRouteRequested = authRoutes.some(route => req.nextUrl.pathname.startsWith(route));
    const isAdminRouteRequested = adminRoutes.some(route => req.nextUrl.pathname.startsWith(route));
    const isUserRouteRequested = userRoutes.some(route => req.nextUrl.pathname.startsWith(route));


    if (isAuthRouteRequested) {  
        if (!verifiedToken) {
          const response = NextResponse.next();
          response.cookies.delete("token");
          return response;
        }
    }

    if (isAdminRouteRequested && ['POST', 'PATCH', 'DELETE'].includes(req.method)) {          
        if (verifiedToken && verifiedToken.role !== 'admin') {
            return NextResponse.redirect(new URL ('/api/auth/unauthorized', req.nextUrl), 303)
        }
    }

    if (isUserRouteRequested && ['POST', 'PATCH', 'DELETE'].includes(req.method)) {          
        if (verifiedToken && verifiedToken.role !== 'user') {
            return NextResponse.redirect(new URL ('/api/auth/unauthorized', req.nextUrl), 303)
        }
    }

    
    return NextResponse.next();
}




export const config = {
    matcher: [
        '/api/auth/login',
        '/api/auth/logout',
        '/api/products/:path*', 
        '/api/categories/:path*',
    ]
};