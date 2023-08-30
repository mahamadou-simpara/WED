const express = require('express');
const authRouter = require('./routes/auth.route');
const productRouter = require('./routes/product.route');
const path = require('path');
const app = express();
const db = require('./data/database');
const csrf = require('csurf');
const addCSRFToken = require('./middlewares/csrf-token');
const errorHandler = require('./middlewares/error-handler');
const sessionStore = require('express-session');
const createMongoDBSession = require('./config/session');
const checkAuthenticationStatus = require('./middlewares/authentication.middleware')

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the custom views folder
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const createSession = createMongoDBSession();
app.use(sessionStore(createSession));

app.use(csrf());
app.use(addCSRFToken);



app.use(authRouter);
app.use(checkAuthenticationStatus);
app.use(productRouter);




app.use(errorHandler);
db.connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server started on port 3000 ...');
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });