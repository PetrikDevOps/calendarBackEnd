import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { connectToDB, q as query } from './db/db';


const app = express();

app.use(cors({}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const users = await connectToDB();

const checkUser = (req, res, next) => {
    const sql = `SELECT * FROM users WHERE email = ${req.body.email}`;
    if(query(users, sql).length > 0) return res.status(400).json({Error: 'User already exists'})
    next();
};

const validateEmail = (req, res, next) => {
    if(!req.body.email == validator.isEmail()) return res.status(400).json({Error: 'Invalid Email'})
    next();
};

const checkUsername = (req, res, next) => {
    const sql = `SELECT * FROM users WHERE username = ${req.body.username}`;
    if(query(users, sql).length > 0) return res.status(400).json({Error: 'Username taken'})
    next();
}

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