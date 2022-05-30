import { model, Schema, Document} from 'mongoose'
import bcrypt from "bcrypt";


export interface IUser extends Document {
    user: string;
    password: string;
    creationDate: Date;
    status: string;
    comparePassword: (password: string) => Promise<Boolean>
  };
  
const userSchema = new Schema<IUser>({
    user: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
      },
      creationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: true
    }
})


userSchema.pre<IUser>("save", async function(next) {
    const user = this;
  
    if (!user.isModified("password")) return next();
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  
    next();
  });
  
  userSchema.methods.comparePassword = async function(
    password: string
  ): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
  };
  
  export default model<IUser>("User", userSchema);