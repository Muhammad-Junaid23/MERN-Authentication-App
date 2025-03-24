const express = require('express');
const router = require('./routes/workouts');
const mongoose = require('mongoose');
require('dotenv').config();

// express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use('/api/workouts', router);

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
