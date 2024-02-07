import { NextRequest, NextResponse } from 'next/server';


export function GET(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ message: 'Not authenticated.' }, { status: 401 })
}