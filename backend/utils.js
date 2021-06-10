/* eslint-disable no-undef */
import jwt from "jsonwebtoken"

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    },
        process.env.JWT_SECRET || 'somethingsecret', //npm install dotenv
        {
            expiresIn: '30d',
        }
    );
}

export const isAuth = (req,res,next) =>{
    const  authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7,authorization.length); // Bearer xxxxxx     ผู้ถือ
        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret',(err,decode) =>{
            if (err) {
                res.status(401).send({message: 'Invalid Token'});
            }else{
                req.user = decode; //call data user signin จาก generateToken jwt.signin
                next(); //  ===>>> orderRouter.post
            }
        })

    }else{
        res.status(401).send({message: 'No Token'});
    }
}

export const isAdmin = (req,res,next) =>{
    if (req.user && req.user.isAdmin) {
        next();
    }else{
        res.status(404).send({message: 'Invalid Admin Token'});
    }
}