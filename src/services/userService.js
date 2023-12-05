import validator from 'validator';
import { connectToDB, q as query } from './db/db';
import jwt from 'jsonwebtoken';

const users = await connectToDB();

export class UserService {
    checkUser = (req, res, next) => {
        const sql = `SELECT * FROM users WHERE email = ${req.body.email}`;
        if(query(users, sql).length > 0) return res.status(400).json({Error: 'User already exists'})
        next();
    };

    validateEmail = (req, res, next) => {
        if(!req.body.email || !validator.isEmail(req.body.email)) return res.status(400).json({Error: 'Invalid Email'});
        next();
    };

    checkUsername = (req, res, next) => {
        const sql = `SELECT * FROM users WHERE username = ${req.body.username}`;
        if(query(users, sql).length > 0) return res.status(400).json({Error: 'Username taken'})
        next();
    }

    verifyUser = (req, res, next) => {
        const token = req.cookies.token;
        if (!token) return res.json({Error: 'No token found'});
      
        jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
          if (err) return res.json({Error: 'Invalid token'});
      
          req.id = result.id;
          next();
        });
      }
}
