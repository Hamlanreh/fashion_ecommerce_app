import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@app/_libs/connectDB';
import Category, {ICategory} from '@app/_models/Category';


export async function GET(req: NextRequest, { params }: { params: any }) {
    try {
        await connectDB();

        const { categoryId } = params;

        const category = await Category.findById(categoryId);

        return NextResponse.json({
            status: 'success',
            data: category
        }, { status: 200 });
    } catch(err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }
}


export async function PATCH(req: NextRequest, { params }: { params: any }) {
    try {
        await connectDB();

        const { categoryId } = params;

        const { name }: ICategory = await req.json();

        const category = await Category.findByIdAndUpdate(categoryId, {
            name
        });
        
        return NextResponse.json({
            status: 'success',
            data: category
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }  
}


export async function DELETE(req: NextRequest, { params }: { params: any }) {
    try {
        await connectDB();

        const { categoryId } = params;

        const deletedCategory =  await Category.findByIdAndDelete(categoryId);

        if(!deletedCategory) return NextResponse.json({ status: 'fail', message: 'Product not found!' }, { status: 404 });

        return NextResponse.json({
            status: 'success',
            data: null
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }
}
