import pubsub from '../pubsub';
import userInstance from '../../service/user';
import constant from '../../lib/constant';

export default {
    createTrainee: (parent, args, context) => {
        const { user } = args;
        const addedUser = userInstance.createUser(user);
        pubsub.publish(constant.subscriptions.TRAINEE_ADDED, { traineeAdded: addedUser});
        return addedUser;
    },
    updateTrainee: (parent, args, context) => {
        const { id, role } = args;
        const updatedUser = userInstance.updateUser(id, role);
        pubsub.publish(constant.subscriptions.TRAINEE_UPDATED, { traineeUpdated: updatedUser});
        return updatedUser;
    },
    deleteTrainee: (parent, args, context) => {
        const { id } = args;
        const deletedUser = userInstance.deleteUser(id);
        pubsub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeDeleted: deletedUser});
        return deletedUser;
    }
};
