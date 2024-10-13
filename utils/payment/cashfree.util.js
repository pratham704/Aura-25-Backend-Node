import crypto from 'crypto';
// import { Cashfree } from 'cashfree-pg';


const generateOrderId = () => {
    const uniqueId = crypto.randomBytes(16).toString('hex');

    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);

    const orderId = hash.digest('hex');

    return orderId.substr(0, 12);
}

export {generateOrderId}