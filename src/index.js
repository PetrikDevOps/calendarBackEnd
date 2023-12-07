import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserService from './services/userService.js';

const app = express();
const userService = new UserService();
const { checkUser, validateEmail, checkUsername, verifyUser } = userService;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
  }));

app.get('/', verifyUser, (req, res) => {
    userService.get(req, res);
  });

app.post('/register', validateEmail, checkUser, checkUsername, (req, res) => {
    userService.register(req, res);
});

app.post('/login', (req, res) => {
    userService.login(req, res);
});

app.use((req, res) => {
    return res.status(404).json({Error: "Missing Page (404)"});
})

app.listen(process.env.PORT || 3000);