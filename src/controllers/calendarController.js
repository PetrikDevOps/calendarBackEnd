import express from 'express';
import dbService from '../services/dbService';
import CalendarService from '../services/calendarService';

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