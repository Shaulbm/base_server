// const express = require('express');
const path = require('path');
// const http = require('http');
// const port = 8080;

// const app = express();
// app.use('/',express.static('dist'));
// app.set('view engine', 'pug');


// app.get('/', (req, res) => {
//     res.sendFile(path.resolve('./dist/index.html'))
// });

// var httpServer = http.createServer(app);

// httpServer.listen(port, () => {
//     console.log("Server is listening on port " + port);
// });

// const express = require('express');
import express, { Request, Response } from 'express';
import { Routes } from './routes';
import * as bodyParser from 'body-parser';
class App {
    app: express.Application;

    constructor() {
        console.log('Starting server...');
        this.app = express();
        this.config();
        this.routes();
    }

    private config() {
        this.app.use(express.static('./dist'));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        // this.app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        //     // console.log('TODO: need to handle authentication requests')
        //     next();
        // });
    }

    private routes() {
        const router: express.Router = express.Router();
        Routes.init(router);
        this.app.use('/api', router);

        this.app.get('*', (req: Request, res: Response) => {
            console.log(res);
            res.sendFile(path.resolve('./dist/index.html'));
        })



    }


}
export default new App().app