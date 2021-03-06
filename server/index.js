const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const SwaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./spec.json');

// Import Routes
const usersRoutes = require('./routes/users.route');
const productsRoutes = require('./routes/products.route');
const ordersRoutes = require('./routes/orders.route');

// Middlewares
app.use(express.json());
app.use(cors());

// Routes middlewares
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
