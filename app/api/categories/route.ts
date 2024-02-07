import { NextRequest, NextResponse } from "next/server";
import connectDB from '@app/_libs/connectDB';
import Category, {ICategory} from '@app/_models/Category';
import { apiFilterFields, apiFeatures } from '@app/_utils/apiFeatures';


export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL (req.url); 

        const filteredParams = apiFilterFields(searchParams, 'name');

        const allCategories = await apiFeatures(req, Category.find(filteredParams));

        return NextResponse.json({
            status: 'success',
            length: allCategories.length,
            data: allCategories
        }, { status: 200 });
    } catch(err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }
}



export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { name }: ICategory = await req.json();

        const newCategory = await Category.create({
            name
        })
        
        return NextResponse.json({
            status: 'success',
            data: newCategory
        }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }  
}