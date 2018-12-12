import mongoose from 'mongoose';

require('../../config/config');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/SMSTest',
  { useNewUrlParser: true },
);

export default mongoose;
