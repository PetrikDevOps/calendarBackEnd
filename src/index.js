import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userController from './controllers/userController.js';
import calendarController from './controllers/calendarController.js';
import dbService from './services/dbService.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST', 'DELETE'],
		credentials: true,
	})
);

app.use(userController);
app.use(calendarController);


app.use((req, res) => {
	return res.status(404).json({ Error: 'Missing Page (404)' });
});

const db = new dbService();
db.init();

app.listen(process.env.PORT || 3000);