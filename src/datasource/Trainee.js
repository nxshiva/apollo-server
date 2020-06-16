import { RESTDataSource } from 'apollo-datasource-rest';
import configuration from '../config/configurations';

export class TraineeAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `${configuration.serviceUrl}/api/trainee`;
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token);
    }

    getAllTrainee = async (options) => await this.get('/', options)

    createTrainee = async (user) => await this.post('/', user)

    updateTrainee = async (payload) => await this.put('/', payload)

    deleteTrainee = async (id) => await this.delete(`/${id}`)

}

