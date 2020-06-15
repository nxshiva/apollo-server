import { AuthenticationError } from 'apollo-server';

export default {
    getMyProfile: async (parent, args, context) => {
        try {
        const { dataSources: { userAPI } } = context;
        const response = await userAPI.getMyProfile();
        return response.data;
        }catch(error) {
            throw new AuthenticationError('Authentication Error');
        }
    }
};
