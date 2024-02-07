import { Document, Model, Schema, Query, model, models } from "mongoose";
import * as validator from 'validator';
import * as bcrypt from 'bcrypt';


export interface IUser extends Document {
    username: String;
    email: String;
    password: String;
    confirmPassword?: String;
    photo?: String;
    address?: string;
    role?: string;
}

interface IUserMethods extends IUser {
    correctPassword(password: string, hashedPassword: string): string;
}

interface IUserModel extends Model<IUser, IUserMethods> {};


const UserSchema = new Schema <IUser, IUserModel>({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
        select: false,
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator(value: string) { return value === (this as unknown as IUser).password }
        }
    },   
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    photo: String,
    address: String,

});



UserSchema.methods.correctPassword = async function (password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
};
  
  
// Middlewares
UserSchema.pre<IUser>('save', async function (next) {
    // Encrypt the password and delete confirm password
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 12);
      this.confirmPassword = undefined;
    }
    next();
});


UserSchema.pre<Query <IUser, IUser>>(/^find/, function (next) {
    this.select('-__v');
    next();
});
    
    
export default models.User || model<IUser, IUserModel>('User', UserSchema);