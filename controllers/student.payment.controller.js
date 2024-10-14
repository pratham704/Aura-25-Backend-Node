import { Cashfree } from 'cashfree-pg';
import {generateOrderId} from '../utils/payment/cashfree.util.js'
import * as jwt from "../utils/auth/jwt.utils.js"
import User from '../models/users.model.js';
import { success_response , fail_response } from '../utils/responses/responses.js';
import PaymentModel from '../models/payments.model.js';
import { encrypt } from '../utils/payment/encrypt.util.js';
import QrData from '../models/qrData.model.js';
import QRCode from 'qrcode'; // Import QRCode library
import EntryExit from '../models/entryExit.model.js';

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
            order_amount: 1.00,
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

        const newPayment = new PaymentModel({
            userId: id, // Reference to the user
            amount: 300,         
            paymentMethod: 'UPI',  
            status: 'Initiated'   
        });

        await newPayment.save();


        const encryptedCode = encrypt(id); 
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


const addData = async (req, res) => {
    try {
        const { id, email } = jwt.getData(req);
        
        const userData = await User.findOne({ _id: id });
        if (!userData) {
            return fail_response(res, 404, "User not found");
        }

        const paymentData = await PaymentModel.findOneAndUpdate(
            { userId: id },
            { status: "Success" }, 
            { new: true } 
        );

        await User.findOneAndUpdate(
            { _id: id },
            { paymentStatus: true }, 
            { new: true } 
        );


        const encryptedCode = encrypt(id); 

        const qrUrl = await QRCode.toDataURL(encryptedCode); 


        const qrData = new QrData({
            userId: id,
            qrUrl: qrUrl,
            vip: false, 
            code: encryptedCode 
        });

        await qrData.save();


        const entryExit = new EntryExit({
            userId: id,
            currentStatus : false , 
            code: 0 
        });

        await entryExit.save();

        const finaldata = await User.findOne({ _id: id });

        success_response(res, 200, "Payment record created successfully",  finaldata);
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        fail_response(res, 500, "Internal server error");
    }
};





export {verifyOrder , createOrder  , addData}