import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", (req, res) => {

});


app.use((req, res) => {
    return res.status(404).json({Error: "Missing Page (404)"});
})

app.listen(process.env.PORT || 3000);