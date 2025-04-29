import { RequestHandler } from 'express';

export interface UsersController {
  getAllUsers: RequestHandler;
  getUserById: RequestHandler;
  createUser: RequestHandler;
  deleteUser: RequestHandler;
  updateUser: RequestHandler;
}

export interface UsersService {
  getUserById: (userId: string) => Promise<any | null>;
  getAllUsers: () => Promise<Array<any>>;
  createUser: (user: any, password: string) => Promise<any>;
  deleteUser: (userId: string) => Promise<any>;
  updateUser: (user: any) => Promise<any>;
}

export interface UsersRepository {
  getUserById: (userId: string) => Promise<any | null>;
  getAllUsers: () => Promise<Array<any>>;
  createUser: (user: any, password: string) => Promise<any>;
  deleteUser: (userId: string) => Promise<any>;
  updateUser: (user: any) => Promise<any>;
}
