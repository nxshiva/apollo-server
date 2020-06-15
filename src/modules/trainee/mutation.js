import { AuthenticationError } from 'apollo-server';
import pubsub from '../pubsub';
import constant from '../../lib/constant';

export default {
    createTrainee: async (parent, args, context) => {
        try {
        const { user: { name, email, password } } = args;
        const { dataSources: { traineeAPI } } = context;
        const response = await traineeAPI.createTrainee({ name, email, password });
        pubsub.publish(constant.subscriptions.TRAINEE_ADDED, { traineeAdded: response.data });
        return response.data;
        }catch(error) {
            throw new AuthenticationError('Authentication Error');
        }
    },
    updateTrainee: async (parent, args, context) => {
        try {
        const { payload: { id, name, email} } = args;
        const { dataSources: { traineeAPI } } = context;
        const response = await traineeAPI.updateTrainee({id, name, email});
        pubsub.publish(constant.subscriptions.TRAINEE_UPDATED, { traineeUpdated: response.data.id });
        return response.data.id;
        }catch(error) {
            throw new AuthenticationError('Authentication Error');
        }
    },
    deleteTrainee: async (parent, args, context) => {
        try {
        const { id } = args;
        const { dataSources: { traineeAPI } } = context;
        const response = await traineeAPI.deleteTrainee(id);
        pubsub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeDeleted: response.data.id });
        return response.data.id;
        }catch(error) {
            throw new AuthenticationError('Authentication Error');
        }
    }
};
