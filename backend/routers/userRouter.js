import express from 'express';
import data from '../data.js';
import User from '../models/userModels.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken, isAuth, isAdmin } from '../utils.js';




const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => { // npm install express-async-handler
    await User.remove({});
    const createUsers = await User.insertMany(data.users);
    res.send({ createUsers });
}));



userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user), //npm install jsonwebtoken
            });
            return;

        }
    }
    res.status(404).send({ message: 'Invalid email or password' });
})
);


userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    const createUser = await user.save();
    res.send({
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
        isAdmin: createUser.isAdmin,
        token: generateToken(createUser),
    });
})
);

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
})
);

userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
    }
    const updateUser = await user.save();
    res.send({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser),


    })


}))

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
}))

userRouter.delete( //await Axios.delete(`/api/users/${userId});  <<<=====  userAction 
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.email === 'admin@example.com') {
                res.status(400).send({message: 'Can Not Delete Admin User'});
                return;
            }
            const deleteUser = await user.remove();
            res.send({message: 'User Deleted', user: deleteUser});
        }else {
            res.status(404).send({message:'User Not Found'});
        }
    })
)



export default userRouter;