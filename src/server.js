import express from 'express';
import Promise from 'promise';
import * as bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';


class Server {

    constructor(config) {
        this.config = config;
        this.app = express();
    }

    bootstrap = () => {
        console.log('Inside Bootstrap');
        this.initBodyParser();
        this.setupRoutes();
        return this;
    }


    initBodyParser = () => {
        const { app } = this;

        console.log('Inside init');

        app.use(bodyParser.urlencoded({ extended: false }));

        // parse application/json
        app.use(bodyParser.json());
    }

    run() {
        const { port } = this.config;

        this.app.listen(port, (err) => {
            if (err) {
                console.log('error');
                throw err;
            }
            console.log('App is running successfully on port ' + port);
        });
    }

    setupRoutes = () => {
        const { app } = this;
        this.app.get('/health-check', (req, res) => {
            console.log('Inside health check');
            res.send('I am OK');
        });

        app.use('/body-parser', (req, res, next) => {
            console.log('Inside Middleware');
            res.send(req.body);
        });

        return this;
    }

    setupApollo(schema) {
        const { app } = this;
        this.server = new ApolloServer({
            ...schema,
            onHealthCheck: () => new Promise((resolve) => {
                resolve('I am ok');
            })
        });
        this.server.applyMiddleware({ app });
        this.run();
    }
}

export default Server;