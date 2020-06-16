import { AuthenticationError } from 'apollo-server';

export default {
    getAllTrainee: async (parent, args, context) => {
        try {
            const { options: { limit, skip } } = args;
            const { dataSources: { traineeAPI } } = context;
            const response = await traineeAPI.getAllTrainee({limit, skip});
            return response.data;
        } catch (error) {
            throw new AuthenticationError('Authentication Error');
        }
    },
};
