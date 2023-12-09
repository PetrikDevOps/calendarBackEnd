import UserService from '../services/userService.js';
import dbService from '../services/dbService.js';
import CalendarService from '../services/calendarService.js';
import express from 'express';

const userController = express.Router();
const db = new dbService();
const calendar = new CalendarService(db);
const userService = new UserService(db, calendar);

const { checkUser, validateEmail, checkUsername, verifyUser, get, register, login} = userService;

userController.get('/', verifyUser, get);
userController.post('/register',validateEmail, checkUser, checkUsername, register);
userController.post('/login', login);


export default userController;