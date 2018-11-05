import mongoose from 'mongoose';

require('../../config/config');

console.log(`env: ${process.env.MONGODB_URI}`);
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true },
);

export default mongoose;
