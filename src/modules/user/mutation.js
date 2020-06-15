import { AuthenticationError } from 'apollo-server';

export default {
    loginUser: async (parent, args, context) => {
        try{
        const { payload: { email, password } } = args;
        const { dataSources: { userAPI } } = context;
        const response = await userAPI.loginUser({email, password});
        return response.data;
        }catch(error) {
            throw new AuthenticationError('Invalid User');
        }
    }
};
