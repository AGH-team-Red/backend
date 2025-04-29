import { UsersRepository, UsersService } from './types';

const getUsersService = (usersRepository: UsersRepository): UsersService => {
  const getUserById = async (userId: string): Promise<any | null> => {
    const user = await usersRepository.getUserById(userId);

    return user;
  };

  const getAllUsers = async (): Promise<Array<any>> => {
    const users = await usersRepository.getAllUsers();

    return users;
  };

  const createUser = async (user: any, password: string): Promise<any> => {
    const creationResult = await usersRepository.createUser(user, password);

    return creationResult;
  };

  const deleteUser = async (userId: string): Promise<any> => {
    const user = await usersRepository.deleteUser(userId);

    return user;
  };

  const updateUser = async (user: any): Promise<any> => {
    const updateResult = await usersRepository.updateUser(user);

    return updateResult;
  };

  return {
    getUserById,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
  };
};

export { getUsersService };
