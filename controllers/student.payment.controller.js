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
        const request = {
            order_amount: 300.00,
            order_currency: "INR",
            order_id: await generateOrderId(),
            customer_details: {
                customer_id: data._id,
                customer_phone: data.profileDetails.phoneNumber || '8073970294',
                customer_name: data.profileDetails.name || 'Student',
                customer_email: data.email
            },
        };
        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        console.log(response.data);
        success_response(200 , "Order id generated" , response.data)
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        fail_response(500 , "Internal server error")
    }
};

const verifyOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
        const { id, email } = jwt.getData(req);

        const paymentStatus = response.status; 

        const newPayment = new PaymentModel({
            userId: id,  
            amount: '300',
            paymentMethod:'UPI' , 
            status: paymentStatus === 'SUCCESS' ? 'Completed' : paymentStatus === 'FAILED' ? 'Failed' : 'Pending'
        });

        await newPayment.save();

        success_response(200, "Payment record created successfully", response);
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        fail_response(500, "Internal server error");
    }
};


export {verifyOrder , createOrder}