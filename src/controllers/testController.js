import express from 'express';
import TestService from '../services/testService.js';
import dbService from '../services/dbService.js';

const testController = express.Router();
const db = new dbService();
const testS = new TestService(db);

const {
    test
} = testS;

testController.post('/test', test);

export default testController;