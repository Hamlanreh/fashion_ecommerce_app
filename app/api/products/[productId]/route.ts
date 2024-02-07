import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@app/_libs/connectDB';
import Product, {IProduct} from '@app/_models/Product';


export async function GET(req: NextRequest, { params }: { params: any }) {
    try {
        await connectDB();

        const { productId } = params;

        const product = await Product.findById(productId).populate('category');;

        return NextResponse.json({
            status: 'success',
            data: product
        }, { status: 200 });
    } catch(err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }
}


export async function PATCH(req: NextRequest, { params }: { params: any }) {
    try {
        await connectDB();

        const { productId } = params;

        const { name, price, rating, category }: IProduct = await req.json();

        const product = await Product.findByIdAndUpdate(productId, {
            name,
            price,
            rating,
            category
        });
        
        return NextResponse.json({
            status: 'success',
            data: product
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }  
}


export async function DELETE(req: NextRequest, { params }: { params: any }) {
    try {
        await connectDB();
        
        const { productId } = params;

        const deletedProduct =  await Product.findByIdAndDelete(productId);

        if(!deletedProduct) return NextResponse.json({ status: 'fail', message: 'Product not found!' }, { status: 404 });

        return NextResponse.json({
            status: 'success',
            data: null
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }
}
