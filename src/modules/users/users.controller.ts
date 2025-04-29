import { UsersController, UsersService } from './types';
import { Request, Response } from 'express';

const getUsersController = (usersService: UsersService): UsersController => {
  const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const user = await usersService.getUserById(id);

    if (!user) {
      res.status(404).send('User not found');
    }

    res.send(user);
  };

  const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await usersService.getAllUsers();

    if (!users) {
      res.status(404).send('Users not found');
    }

    res.send(users);
  };

  const createUser = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, role, password } = req.body;

    if (!password) {
      res.status(400).send({ message: 'Password is required' });

      return;
    }

    const user = await usersService.createUser({ firstName, lastName, email, role }, password);

    if (!user) {
      res.status(404).send('User not found');
    }

    res.send(user);
  };

  const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const user = await usersService.deleteUser(id);

    if (!user) {
      res.status(404).send('User not found');
    }

    res.send(user);
  };

  const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { body } = req;

    const user = await usersService.updateUser(body);

    if (!user) {
      throw Error('User not found');
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
