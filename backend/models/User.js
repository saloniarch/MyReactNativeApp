import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true // trims whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true // Ensures email is stored in lowercase
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// compare entered password with hashed password in the database
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default model('User', UserSchema);
