const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const deliveryRoutes = require('./routes/delivery');
const packageRoutes = require('./routes/package');
const defaultRoutes = require('./routes/default');
const userRoutes = require('./routes/user');
const helmet = require("helmet");
const path = require('path');
const rateLimit = require('express-rate-limit');

// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SwaggerOptions = require('./swagger/swagger.json');
const swaggerDocument = swaggerJsDoc(SwaggerOptions);


require('dotenv').config();

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connection to MongoDB successful !'))
  .catch(() => console.log('Connection to MongoDB failed !'));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use('/images', express.static(path.join(__dirname, 'images')));

//delivery
app.use('/api/deliveries', deliveryRoutes);
//package
app.use('/api/packages', packageRoutes);
//auth
app.use('/api/auth', userRoutes);
//default
app.use('/api', defaultRoutes);

//api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



module.exports = app;