const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Eroute = require('./Routes/Eroute');
const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      'mongodb://localhost:27017/merntask',
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  }
};
connectDB();
app.use('/api', Eroute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
