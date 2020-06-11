import config from './config/configurations';
import Server from './server';
import schema from './modules';

const server = new Server(config);

server.setupApollo(schema);
