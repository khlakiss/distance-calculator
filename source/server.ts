import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import distanceRoutes from './routes/distance';
import cors from 'cors';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const NAMESPACE = 'Server';
const app = express();

/** log requests */
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});

app.use(cors());

/** Rules for the APIs */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET POST');
        return res.status(200).json({});
    }
    next();
});

/** Inject body parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Routes */
app.use('/distance', cors(), distanceRoutes);

/** Swagger Configuration */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/** Error Handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Create the server */
const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
