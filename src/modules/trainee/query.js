import { AuthenticationError } from 'apollo-server';

export default {
    getAllTrainee: async (parent, args, context) => {
        try {
        const { dataSources: { traineeAPI } } = context;
        const response = await traineeAPI.getAllTrainee();
        return response.data;
        }catch(error) {
            throw new AuthenticationError('Authentication Error');
        }
    },
};
