import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,

    },
    password: {
      type: String,
      require: true,
      minlength: 6,

    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      // require:true
      default: 'user'
    },
  },
  {
    timestamps: true
  }
)
// .pre('save') is act as a middleware that Mongoose promises to run every time a User.save() command is executed.
userSchema.pre('save',async function (next) {//We attach a function to run before the "save" event.
  /**async function (next): It's an async function because hashing takes time. The
   *  next parameter is a function we must call to tell Mongoose "we're done, you can 
   * proceed with the save." */
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    /**bcrypt.genSalt(10): Generates a unique "salt." 
     * This ensures that even if two users have the same password ("123456"), their hashes
     *  will look completely different. */

    const hashedPassword = await bcrypt.hash(this.password,salt);

    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
export default User;