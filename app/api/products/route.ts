import { NextRequest, NextResponse } from "next/server";
import connectDB from '@app/_libs/connectDB';
import Product, { IProduct } from '@app/_models/Product'; 
import Category from '@app/_models/Category'; 
import { apiFilterFields, apiFeatures } from '@app/_utils/apiFeatures';


export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL (req.url); 

        const filteredParams = apiFilterFields(searchParams, 'name', 'category');

        let query;

        // Find category using category id from product
        if (Object.keys(filteredParams).length > 0) {
            if (filteredParams?.category && filteredParams.category !== '') {
                const { _id } = await Category.findOne({ name: filteredParams.category })
                query = Product.find({ category: _id })
            } else {
                query = Product.find(filteredParams)
            }
        } else {
            query = Product.find().populate('category');
        }

        const allProducts = await apiFeatures(req, query);

        return NextResponse.json({
            status: 'success',
            length: allProducts.length,
            data: allProducts
        }, { status: 200 });
    } catch(err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }
}



export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { name, image, price, rating, category }: IProduct = await req.json();
        
        const newProduct = await Product.create({
            name,
            image,
            price,
            rating, 
            category
        })
        
        return NextResponse.json({
            status: 'success',
            data: newProduct
        }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ status: 'fail', message: 'Bad request' }, { status: 400 });
    }  
}