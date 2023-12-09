import UserService from '../services/userService.js';
import express from 'express';

const userController = express.Router();
const userService = new UserService();

const { checkUser, validateEmail, checkUsername, verifyUser } = userService;

userController.get('/', verifyUser, userService.get);
userController.post('/register',validateEmail, checkUser, checkUsername, userService.register);
userController.post('/login', userService.login);


export default userController;