import { Document, Model, Schema, Types, Query, model, models } from "mongoose";


export interface IProduct extends Document {
    name: String;
    image: String;
    price: Number;
    rating: Number;
    category: Types.ObjectId;
    createdAt: Date;
}

interface IProductModel extends Model<IProduct> {};


const ProductSchema = new Schema <IProduct, IProductModel>({
    name: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 1,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },

});

  
// Middlewares
ProductSchema.pre<Query <IProduct, IProduct>>(/^find/, function (next) {
    this.select('-__v');
    next();
});
    
    
export default models.Product || model<IProduct, IProductModel>('Product', ProductSchema);