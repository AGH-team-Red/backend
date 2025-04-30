import { UsersController, UsersService } from './types';
import { Request, Response } from 'express';
import { ServerError } from 'utils/server-error';

const getUsersController = (usersService: UsersService): UsersController => {
  const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const user = await usersService.getUserById(id);

    if (!user) {
      throw new ServerError(`User of id: ${id} not Found`, 404);
    }

    res.send(user);
  };

  const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await usersService.getAllUsers();

    if (!users) {
      throw new ServerError(`Users not found`, 404);
    }

    res.send(users);
  };

  const createUser = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, role, password } = req.body;

    if (!password) {
      throw new ServerError('Password is required', 404);
    }

    const user = await usersService.createUser({ firstName, lastName, email, role }, password);

    if (!user) {
      throw new ServerError('User not found', 404);
    }

    res.send(user);
  };

  const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const user = await usersService.deleteUser(id);

    if (!user) {
      throw new ServerError(`User with id ${id} not found`, 404);
    }

    res.send(user);
  };

  const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { body } = req;

    const user = await usersService.updateUser(body);

    if (!user) {
      throw new ServerError('User not found', 404);
    }

    res.send(user);
  };

  return {
    getUserById,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
  };
};

export { getUsersController };
