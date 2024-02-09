import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose';
import connectDB from "@app/_libs/connectDB";
import UserModel, { IUser } from '@app/_models/User';


export async function POST (req: NextRequest) {
  try {
    await connectDB();

    const { email, password }: IUser = await req.json();
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return NextResponse.json({ status: 'fail', message: 'User does not exist' }, { status: 400 });
    }
    user.password = undefined;
                     
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
    const token = await new jose.SignJWT({ id: user._id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${process.env.TOKEN_EXPIRATION_TIME}`)
    .sign(secret)
        
    const data = { status: 'success', user, token };
    const response = await new NextResponse(JSON.stringify(data), { status: 200 });    
    response.cookies.set('token', token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: process.env.NODE_ENV !== "development",
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: "strict",
    });
    
    return response;
  } catch (err) {
    return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
  }  
};
