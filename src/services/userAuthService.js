import validator from 'validator';
import { connectToDB, q as query } from './db/db';
import jwt from 'jsonwebtoken';

const users = await connectToDB(); //Be aware ever time you call users a new socker connection is made btw the db server and the app!!!!

export class UserService {

    //auth middleware
    
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

    //auth
    
    register = (req, res) => {
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
    };

    login = (req, res) => {
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
    }

    //base ituls
    get = (req, res) => {
        const sql = `SELECT * FROM users WHERE id = ${req.id}`;
        try {
            query(users, sql);
        }
        catch(err) {
            return res.status(400).json({Error: 'Error getting user'});
        }
        return res.status(200).json({Success: 'Logged in', user: {id: result[0].id, username: result[0].username, email: result[0].email}});
    }
}
