import { NextRequest, NextResponse } from "next/server";
import connectDB from "@app/_libs/connectDB";
import UserModel, { IUser } from '@app/_models/User';


export async function POST(req: NextRequest) {
    try {
        await connectDB();        
        const { username, email, password, confirmPassword }: IUser = await req.json();
        const user = await UserModel.create({ username, email, password, confirmPassword }); 
        return NextResponse.json({ status: 'success', user }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }  
};
