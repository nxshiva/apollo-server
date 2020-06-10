import userInstance from '../../service/user';

export default {
    getAllTrainee: () => userInstance.getAllUsers(),

    getTrainee: (parent, args, context) => {
        const { id } = args;
        return userInstance.getUser(id);
    }
};