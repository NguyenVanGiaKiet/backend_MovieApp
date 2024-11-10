// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const movieRoutes = require('./routes/movieRoutes');
const usersRoutes = require('./routes/usersRoutes');
const moviePopularRoutes = require('./routes/moviePopularRoutes');
const movieTopRatedRoutes = require('./routes/movieTopRatedRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối tới MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Kết nối MongoDB thành công'))
  .catch((error) => console.error('Lỗi kết nối MongoDB:', error));

// Middleware
app.use(express.json());

// Routes
app.use('/movies', movieRoutes);
app.use('/users', usersRoutes);
app.use('/popular', moviePopularRoutes);
app.use('/toprated', movieTopRatedRoutes);

// Lắng nghe cổng
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
