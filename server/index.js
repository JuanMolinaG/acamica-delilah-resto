const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db-connection');

dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
