import express from 'express';
import dbService from '../services/dbService.js';
import CalendarService from '../services/calendarService.js';

const calendarController = express.Router();
const db = new dbService();
const calendar = new CalendarService(db);

const {
    get,
    openDay,
    validateDate
} = calendar;

calendarController.post('/getDay', get);
calendarController.post('/openDay', validateDate, openDay);


export default calendarController;