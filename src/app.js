const express = require('express');
const path = require('path');
const http = require('http');
const port = 8080;

const app = express();
app.use('/',express.static('dist'));
app.set('view engine', 'pug');


app.get('/', (req, res) => {
    res.sendFile(path.resolve('./dist/index.html'))
});

var httpServer = http.createServer(app);

httpServer.listen(port, () => {
    console.log("Server is listening on port " + port);
});



// import * as express from 'express'; '
// '
// class Server {
//     app: express.Application;

//     constructor() {
//         this.app = express();
//         this.config();
//         this.startRoutes();
//     }

//     private config() {
//         app.use(express.static('../dist'));
//     }

//     private startRoutes() {
//         const router: express.Router = express.Router();
//         router.init(router);
//         this.app.use('/', router);
//     }
// }
// export default new Server().app