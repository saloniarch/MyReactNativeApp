import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    unique: true, 
    index: true
  },
  password: {
    type: String,
    required: true,
  },
});

export default model('User', UserSchema);
