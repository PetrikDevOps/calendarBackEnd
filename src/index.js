import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { connectToDB, q as query } from './db/db';
import { UserService } from './services/userService';

const app = express();
const userService = new UserService();
const { checkUser, validateEmail, checkUsername } = userService;

app.use(cors({}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const users = await connectToDB();

app.post('/register', validateEmail, checkUser, checkUsername, (req, res) => {
    if(req.body.status.Error) {
        return res.status(400).json(req.body.status)
    }
    bcrypt.hash(req.body.password.toString(), process.env.SALT || 10, (err, hash) => {
        if(err) return res.status(400).json({Error: 'Error hashing password'});
        const sql = `INSERT INTO users (username, email, password) VALUES (${req.body.username}, ${req.body.email}, ${hash})`;
        try {
            query(users, sql);
        } catch (err) {
            return res.status(400).json({Error: err})
        }
        return res.status(200).json({Success: 'User successfully created'})
    }) 
})

app.use((req, res) => {
    return res.status(404).json({Error: "Missing Page (404)"});
})

app.listen(process.env.PORT || 3000);