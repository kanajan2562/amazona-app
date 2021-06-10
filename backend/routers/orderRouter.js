import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';


const orderRouter = express.Router();

orderRouter.get('/mine',isAuth,expressAsyncHandler(async(req,res) =>{
    const orders =  await Order.find({user:req.user._id});
    res.send(orders);
}))

orderRouter.post('/',

    isAuth, // ===>next() form  isAuth  ../utils
    expressAsyncHandler(async (req, res) => {


        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: 'Cart is empty' });
        } else {
            const order = new Order ({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,//6.42.43
                user: req.user._id, // form ==> utils.js isAuth
            });
            const createOrder = await order.save();
            res
                .status(201)
                .send({message: 'New Order Created', order:createOrder});
        }
    })
);


orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async(req,res) =>{
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        }else{
            res.status(404).send({message:'Order Not Found'});
        }
    })

)


export default orderRouter;