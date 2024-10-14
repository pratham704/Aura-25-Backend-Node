import QrData from "../models/qrData.model.js";
import * as jwt from "../utils/auth/jwt.utils.js";
import DynamicQr from "../models/dynamicqr.model.js";
import { success_response, fail_response } from "../utils/responses/responses.js";
import { encrypt } from "../utils/payment/encrypt.util.js";


const getData = async (req, res) => {
  try {
    const { id: userId } = jwt.getData(req);
    const qrData = await QrData.find({ userId });
    if (!qrData || qrData.length === 0) {
      return res.status(404).json({ message: "No QR data found for this user." });
    }
    success_response(res, 200, "success", qrData)
  } catch (error) {
    console.error("Error retrieving QR data:", error);
    res.status(500).json({ message: "An error occurred while fetching QR data." });
  }
};



const newVipAdd = async (req, res) => {
  try {


    const { number } = req.body;
    if (!number) fail_response(res, 400, "Number not provided")


    const newQrData = new DynamicQr({
      numberofppl: number,
    });

    const savedData = await newQrData.save();

    const encryptedId = encrypt(savedData._id.toString());
    console.log("Encrypted ID:", encryptedId);

    savedData.dynamiccode = encryptedId;
    await savedData.save();


    success_response(res, 200, "success", savedData)
  } catch (error) {
    console.error("Error retrieving QR data:", error);
    res.status(500).json({ message: "An error occurred while fetching QR data." });
  }
};

export { newVipAdd  , getData};
