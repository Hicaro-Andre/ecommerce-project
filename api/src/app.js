require('dotenv').config();
const express = require('express');
const cors = require('cors'); // 👈 IMPORTANTE
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const connectDB = require('./config/db');
const routes = require('./routes/routes');

const app = express();

// Conecta com o banco de dados
connectDB();

// Middlewares
app.use(cors()); // 👈 Habilita CORS para requisições do front-end
app.use(express.json());

// Rota para documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


// Demais rotas da aplicação
app.use(routes);

module.exports = app;
