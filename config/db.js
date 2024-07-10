const mongoose = require('mongoose');
const uri = 'mongodb+srv://syrineghazghazi:%40%4002031997%40%40@cluster0.51gzbwf.mongodb.net/';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
