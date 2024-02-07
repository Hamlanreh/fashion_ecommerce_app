import { Document, Model, Schema, Query, model, models } from "mongoose";


export interface ICategory extends Document {
    name: String;
}

interface ICategoryModel extends Model<ICategory> {};

const CategorySchema = new Schema <ICategory, ICategoryModel>({
    name: {
        type: String,
        enum: ["clothing", "shoes", "accessories", "jewelry"],
        unique: true,
        required: true,
    }
});

  
// Middlewares
CategorySchema.pre<Query <ICategory, ICategory>>(/^find/, function (next) {
    this.select('-__v');
    next();
});
    
    
export default models.Category || model<ICategory, ICategoryModel>('Category', CategorySchema);