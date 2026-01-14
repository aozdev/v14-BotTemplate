const mongoose = require('mongoose');

module.exports = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed', err);
  }
};
