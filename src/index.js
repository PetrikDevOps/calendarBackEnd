import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userController from './controllers/userController.js';
import calendarController from './controllers/calendarController.js';
import testController from './controllers/testController.js';

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

app.use(testController);
app.use(userController);
app.use(calendarController);

app.get('/test', (req, res) => {
	res.json('test ok');
});

app.use((req, res) => {
	return res.status(404).json({ Error: 'Missing Page (404)' });
});

app.listen(process.env.PORT || 3000);
