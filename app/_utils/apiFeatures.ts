import { NextRequest } from 'next/server';


export function apiFeatures(req: NextRequest, queryObj: any) {
    const { searchParams } = new URL (req.url);

    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 20;      
    const sort = searchParams.get('sort')?.split(',').join(' ') || '';
    const fields = searchParams.get('fields')?.split(',').join(' ') || '';
    
    let newQuery = queryObj;

    if (searchParams.has('page')) {
        newQuery = newQuery.limit(limit).skip((page - 1) * limit);                
    }
    if (searchParams.has('sort')) {
        newQuery = newQuery.sort(sort);
    }
    if (searchParams.has('fields')) {
        newQuery = newQuery.select(fields);
    }

    return newQuery; 
}


export function apiFilterFields (params: URLSearchParams, ...allowedFields: any) {
    const filteredFields: any = {};
    allowedFields.map((field: any) => {
        if (!params.has(field)) return;
        return filteredFields[field] = { $regex: `^${params.get(field)}` }
    })
    return filteredFields;    
}