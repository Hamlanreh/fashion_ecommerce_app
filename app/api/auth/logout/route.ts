import { NextRequest, NextResponse } from "next/server";


export async function POST (req: NextRequest) {  
  const response = await new NextResponse(JSON.stringify({ status: 'success' }), { status: 200 });    
  response.cookies.delete('jwt');  
  return response;
};