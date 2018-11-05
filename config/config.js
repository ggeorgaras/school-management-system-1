const env = process.env.NODE_ENV;

if (env === 'development') {
  console.log('inside');
  process.env.PORT = 5001;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/SMS';
} else if (env === 'test') {
  process.env.PORT = 5001;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/SMSTest';
} else if (env === 'production') {
  process.env.PORT = 9000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/SMS';
}
