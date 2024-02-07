import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@app/_libs/connectDB';
import Order, {IOrder} from '@app/_models/Order';


export async function GET(req: NextRequest, { params }: { params: any }) {
    try {
        await connectDB();

        const { orderId } = params;

        const order = await Order.findById(orderId);

        return NextResponse.json({
            status: 'success',
            data: order
        }, { status: 200 });
    } catch(err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }
}


export async function PATCH(req: NextRequest, { params }: { params: any }) {
    try {
        await connectDB();

        const { orderId } = params;

        const { items, total, status }: IOrder = await req.json();

        const order = await orderId.findByIdAndUpdate(orderId, {
            items,
            total,
            status
        });
        
        return NextResponse.json({
            status: 'success',
            data: order
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }  
}


export async function DELETE(req: NextRequest, { params }: { params: any }) {
    try {
        await connectDB();

        const { orderId } = params;

        const deletedOrder =  await Order.findByIdAndDelete(orderId);

        if(!deletedOrder) return NextResponse.json({ status: 'fail', message: 'Product not found!' }, { status: 404 });

        return NextResponse.json({
            status: 'success',
            data: null
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }
}
 