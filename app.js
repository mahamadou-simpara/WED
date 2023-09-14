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
const checkAuthenticationStatus = require('./middlewares/authentication.middleware');
const adminRouter = require('./routes/admin.route');
const baseRouter = require('./routes/base.router')
const protectRoute = require('./middlewares/protect-routes');
const cartMiddleware = require('./util/cart');
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the custom views folder
app.use(express.static('public'));
app.use('/products/assets/', express.static('uploaded-data'));
app.use(express.urlencoded({extended: false}));

const createSession = createMongoDBSession();
app.use(sessionStore(createSession));

app.use(cartMiddleware);

app.use(csrf());
app.use(addCSRFToken);


app.use(checkAuthenticationStatus);
app.use(baseRouter);
app.use(authRouter);
app.use(productRouter);
app.use(protectRoute);
app.use('/admin', adminRouter);



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