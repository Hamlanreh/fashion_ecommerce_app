import { NextRequest, NextResponse } from "next/server";
import connectDB from '@app/_libs/connectDB';
import Order, { IOrder } from '@app/_models/Order';
import { apiFilterFields, apiFeatures } from '@app/_utils/apiFeatures';


export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL (req.url); 

        const filteredParams = apiFilterFields(searchParams);

        const allOrders = await apiFeatures(req, Order.find(filteredParams));

        return NextResponse.json({
            status: 'success',
            length: allOrders.length,
            data: allOrders
        }, { status: 200 });
    } catch(err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }
}


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { user, items, total, status }: IOrder = await req.json();

        const newOrder = await Order.create({
            user, 
            items, 
            total, 
            status
        });
        
        return NextResponse.json({
            status: 'success',
            data: newOrder
        }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }  
}