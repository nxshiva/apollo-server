import express from 'express';
import Promise from 'promise';
import * as bodyParser from 'body-parser';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { UserAPI, TraineeAPI } from './datasource';


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

    run = () => {
        const { port } = this.config;

        this.httpServer.listen(port, (err) => {
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

    setupApollo = (schema) => {
        const { app } = this;
        this.server = new ApolloServer({
            ...schema,
            dataSources: () => ({
                userAPI: new UserAPI(),
                traineeAPI: new TraineeAPI(),
            }),
            context: ({ req }) => {
                if (req) {
                    return { token: req.headers.authorization };
                }
                return {};
            },
            onHealthCheck: () => new Promise((resolve) => {
                resolve('I am ok');
            })
        });
        this.server.applyMiddleware({ app });
        this.httpServer = createServer(app);
        this.server.installSubscriptionHandlers(this.httpServer);
        this.run();
    }
}

export default Server;
