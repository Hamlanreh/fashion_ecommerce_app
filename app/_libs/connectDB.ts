import mongoose from 'mongoose';


export default async function connectDB() {
    try {
        const connection = { isConnected: 0 };
        // const DATABASE_URI = (
        //     process.env.NODE_ENV === 'development' ? 
        //     process.env.LOCAL_DATABASE_URI : `${process.env.DATABASE_URI}`.replace('<password>', process.env.DATABASE_PASSWORD as string)
        // );
        const db = await mongoose.connect(`${process.env.DATABASE_URI}`.replace('<password>', process.env.DATABASE_PASSWORD as string));
        connection.isConnected = db.connections[0].readyState;
        if(connection.isConnected) console.log(`Database connection is successful...`);
        
    } catch (err) {
        console.log('Database connection has failed!');   
    }
}