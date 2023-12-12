import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';




import userController from './controllers/userController.js';
import calendarController from './controllers/calendarController.js';
import dbService from './services/dbService.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'DELETE'],
		credentials: true,
	})
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.use(userController);
app.use(calendarController);


app.use((req, res) => {
	return res.status(404).json({ Error: 'Missing Page (404)' });
});

const db = new dbService();
db.init();

app.listen(process.env.PORT || 3000);