import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default class UserService {
	constructor(db, calendar) {
		this.db = db;
		this.calendar = calendar;
	}

	//auth middleware
	validateRegistration = async (req, res, next) => {
		const { email, username, password } = req.body;
		if (!email || !username || !password) {
			return res.status(400).json({ Error: 'Missing fields' });
		}
		if (!validator.isEmail(email)) {
			return res.status(400).json({ Error: 'Invalid email' });
		}
		if (!validator.isAlphanumeric(username)) {
			return res.status(400).json({
				Error: 'Username cannot contain special characters or spaces',
			});
		}

		try {
			//check email
			const user = await this.db.query(
				`SELECT * FROM users WHERE email = '${email}'`
			);
			if (user.length > 0)
				return res.status(400).json({ Error: 'Email already registered' });
			//check username
			const usernameCheck = await this.db.query(
				`SELECT * FROM users WHERE username = '${username}'`
			);
			if (usernameCheck.length > 0)
				return res
					.status(400)
					.json({ Error: 'Username already registered' });
			next();
		} catch (err) {
			return res.status(400).json({ Error: 'Error checking user' });
		}
	};

	validateLogin = (req, res, next) => {
		const { account, password, isEmail } = req.body;
		if (!account || !password) {
			return res.status(400).json({ Error: 'Missing fields' });
		}
		if (isEmail && !validator.isEmail(account)) {
			return res.status(400).json({ Error: 'Invalid email' });
		}

		next();
	};

	register = async (req, res) => {
		const { email: Email, username: Username, password: Password } = req.body;

		try {
			const hashedPassword = await bcrypt.hash(Password.toString(), 10);
			await this.db.query(
				`INSERT INTO users (email, username, password) VALUES ('${Email}', '${Username}', '${hashedPassword}')`
			);

			const user = await this.db.query(
				`SELECT * FROM users WHERE email = '${Email}'`
			);
			if (user.length === 0)
				return res
					.status(400)
					.json({ Error: 'Error creating new user (1)' });
			const { id, email, username } = user[0];
			const token = jwt.sign(
				{ id, email, username },
				process.env.JWT_SECRET,
				{
					expiresIn: process.env.JWT_EXPIRES_IN || '3d',
				}
			);

			return res
				.cookie('token', token, {
					httpOnly: true,
					secure: true,
					sameSite: 'none',
				})
				.res.status(200)
				.json({ Success: 'User created' });
		} catch (err) {
			return res.status(400).json({ Error: 'Error creating new user' });
		}
	};

	login = async (req, res) => {
		const { account, password: Password, isEmail } = req.body;
		const sqlQuery = isEmail
			? `SELECT * FROM users WHERE email = '${account}'`
			: `SELECT * FROM users WHERE username = '${account}'`;

		try {
			//get user
			const user = await this.db.query(sqlQuery);
			if (user.length === 0)
				return res.status(400).json({ Error: "User doesn't exist" });
			const { id, username, email, password } = user[0];

			//check password
			const passwordCheck = await bcrypt.compare(Password, password);
			if (!passwordCheck)
				return res.status(400).json({ Error: 'Invalid password' });

			//sign token
			const token = jwt.sign(
				{ id, email, username },
				process.env.JWT_SECRET,
				{
					expiresIn: process.env.JWT_EXPIRES_IN || '3d',
				}
			);
			return res
				.cookie('token', token, {
					httpOnly: true,
					secure: true,
					sameSite: 'none',
				})
				.status(200)
				.json({ Success: 'User logged in' });
		} catch (err) {
			return res.status(400).json({ Error: 'Error logging in' });
		}
	};

	getUser = (req, res) => {
		//get token
		const { token } = req.cookies;
		if (!token) return res.status(400).json({ Error: 'Unauthorized' });

		try {
			//decode token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const { id, email, username } = decoded;

			//return user
			return res
				.status(200)
				.json({ Success: 'User logged in', user: { id, email, username } });
		} catch (err) {
			return res.status(400).json({ Error: 'Error getting user' });
		}
	};

	logout = (req, res) => {
		res.clearCookie('token');
		return res.status(200).json({ Success: 'User logged out' });
	};
}
