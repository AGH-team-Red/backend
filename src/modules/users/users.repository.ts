import { UsersRepository } from './types';

const getUsersRepository = (): UsersRepository => {
  const getUserById = async (id: string): Promise<any | null> => {
    // @ts-ignore
    const user = [];

    // @ts-ignore
    return user;
  };

  const getUserByEmailForAuth = async (email: string): Promise<any | null> => {
    const user = {};

    return user;
  };

  const getAllUsers = async (): Promise<Array<any>> => {
    // @ts-ignore
    const users = [];

    // @ts-ignore
    return users;
  };

  const createUser = async (user: any, password: string): Promise<any> => {
    const newUser = {};

    return newUser;
  };

  const deleteUser = async (id: string): Promise<any> => {
    const deletedUser = {};

    return deletedUser;
  };

  const updateUser = async (user: any): Promise<any> => {
    const updatedUser = {};

    return updatedUser;
  };

  return {
    getUserById,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
  };
};

export { getUsersRepository };
