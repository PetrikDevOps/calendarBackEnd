import UserService from '../services/userService.js';
import dbService from '../services/dbService.js';
import CalendarService from '../services/calendarService.js';
import express from 'express';

const userController = express.Router();
const db = new dbService();
const calendar = new CalendarService(db);
const userService = new UserService(db, calendar);

const {
	validateRegistration,
	validateLogin,
	getUser,
	register,
	login,
	logout,
} = userService;

userController.get('/user', getUser);
userController.post('/register', validateRegistration, register);
userController.post('/login', validateLogin, login);
userController.delete('/logout', logout);

export default userController;
