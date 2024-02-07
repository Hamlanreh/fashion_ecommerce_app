import { Document, Model, Schema, Types, Query, model, models } from "mongoose";


interface OrderItem extends Document {
   product: Types.ObjectId,
   quatity: Number,
}

export interface IOrder extends Document {
    user: Types.ObjectId;
    items: OrderItem[];
    total: Number;
    status: String;
    createdAt: Date;
}

interface IOrderModel extends Model<IOrder> {};


const OrderSchema = new Schema <IOrder, IOrderModel>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            min: 0,
            required: true,
        },
    }],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["cancelled", "paid", "delivered"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },

});


  
// Middlewares
OrderSchema.pre<Query <IOrder, IOrder>>(/^find/, function (next) {
    this.select('-__v');
    next();
});
    
    
export default models.Order || model<IOrder, IOrderModel>('Order', OrderSchema);