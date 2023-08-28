const express = require('express');
const authRouter = require('./routes/auth.route');
const path = require('path');
const app = express();
const db = require('./data/database');



app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the custom views folder
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));




app.use(authRouter);

db.connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server started on port 3000 ...');
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });