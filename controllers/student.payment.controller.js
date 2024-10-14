import { Cashfree } from 'cashfree-pg';
import {generateOrderId} from '../utils/payment/cashfree.util.js'
import * as jwt from "../utils/auth/jwt.utils.js"
import User from '../models/users.model.js';
import { success_response , fail_response } from '../utils/responses/responses.js';
import PaymentModel from '../models/payments.model.js';

import dotenv from 'dotenv';
dotenv.config();

Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


 const createOrder = async (req, res) => {
    const { id, email } = jwt.getData(req);
    const data = await User.findOne({
        _id: id
    })

    if(data.paymentStatus) return success_response(200 , "Already Done" ,data )

    try {
        let request = {
            "order_amount": 1.00,
            "order_currency": "INR",
            "order_id": await generateOrderId(),
            "customer_details": {
                "customer_id": "webcodder01",
                "customer_phone": "9999999999",
                "customer_name": "Web Codder",
                "customer_email": "webcodder@example.com"
            },
        }
        // Cashfree.PGCreateOrder("2023-08-01", request).then(response => {
        //     console.log(response.data);
        //     res.json(response.data);

        // }).catch(error => {
        //     console.error(error.response.data.message);
        // })
        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        console.log(response.data);

        const newPayment = new PaymentModel({
            userId: id, // Reference to the user
            amount: 300,         
            paymentMethod: 'UPI',  
            status: 'Initiated'   
        });

        await newPayment.save();
        success_response( res, 200 , "Order id generated" , response.data)
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        fail_response(res , 500 , "Internal server error")
    }
};

const verifyOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const response = await Cashfree.PGFetchOrder("2023-08-01", orderId);
        console.log(response.data)
        const { id, email } = jwt.getData(req);
        const paymentStatus = response.data.order_status; 
        const data =  await PaymentModel.findOneAndUpdate(
            { userId: id }, 
            { status: paymentStatus }, 
        );

        success_response( res,200, "Payment record created successfully", data);
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        fail_response( res , 500, "Internal server error");
    }
};


export {verifyOrder , createOrder}