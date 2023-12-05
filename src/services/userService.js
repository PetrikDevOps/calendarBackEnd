export class UserService {
    checkUser = (req, res, next) => {
        const sql = `SELECT * FROM users WHERE email = ${req.body.email}`;
        if(query(users, sql).length > 0) return res.status(400).json({Error: 'User already exists'})
        next();
    };

    validateEmail = (req, res, next) => {
        if(!req.body.email == validator.isEmail()) return res.status(400).json({Error: 'Invalid Email'})
        next();
    };

    checkUsername = (req, res, next) => {
        const sql = `SELECT * FROM users WHERE username = ${req.body.username}`;
        if(query(users, sql).length > 0) return res.status(400).json({Error: 'Username taken'})
        next();
    }
}
