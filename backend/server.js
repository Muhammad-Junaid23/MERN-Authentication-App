require('dotenv').config();
const express = require('express');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');

// express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT;
// connection to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Connnected to MongoDB & Server running at Port : ', PORT);
    });
  })
  .catch((error) => {
    console.log('Error : ', error);
  });
