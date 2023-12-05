import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import { connectToDB, q as query } from './db/db';
import { UserService } from './services/userService';

const app = express();
const userService = new UserService();
const { checkUser, validateEmail, checkUsername, verifyUser } = userService;

app.use(cors({}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
const users = await connectToDB();


app.get('/', verifyUser, (req, res) => {
    const sql = `SELECT * FROM users WHERE id = ${req.id}`;
    try {
        query(users, sql);
    }
    catch(err) {
        return res.status(400).json({Error: 'Error getting user'});
    }
    return res.status(200).json({Success: 'Logged in', user: {id: result[0].id, username: result[0].username, email: result[0].email}});
  });

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
});

app.post('/login', (req, res) => {
    const sql = `SELECT * FROM users WHERE email = ${req.body.email}`;
    let result = [];
    try {
        result = query(users, sql);
    } catch (err) {
        return res.status(400).json({Error: 'Error logging in'});
    };
    if(result.length === 0) return res.status(400).json({Error: 'No user found'});
    bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
        if(err) return res.status(400).json({Error: 'Error logging in'});
        if(response) {
            const id = result[0].id;
            const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.TOKEN_EXPIRE_TIME || '1w'});
            res.cookie('token', token);
            return res.status(200).json({Success: 'Logged in'});
        } else {
            return res.status(400).json({Error: 'Incorrect password'});
        }
    })
});

app.use((req, res) => {
    return res.status(404).json({Error: "Missing Page (404)"});
})

app.listen(process.env.PORT || 3000);