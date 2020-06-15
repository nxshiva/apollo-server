import { RESTDataSource } from 'apollo-datasource-rest';
import configuration from '../config/configurations';

export class UserAPI extends RESTDataSource{
    constructor() {
        super();
        this.baseURL = `${configuration.serviceUrl}/api/user`;
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token);
    }

    getMyProfile = () => this.get('/me')

    loginUser = (payload) => this.post('/login', payload)

}

