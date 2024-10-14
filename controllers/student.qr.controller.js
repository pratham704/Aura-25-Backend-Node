import QrData from "../models/qrData.model.js";
import * as jwt from "../utils/auth/jwt.utils.js";
import { success_response , fail_response } from "../utils/responses/responses.js";

const getData = async (req, res) => {
  try {
    const { id: userId } = jwt.getData(req);
    const qrData = await QrData.find({ userId });
    if (!qrData || qrData.length === 0) {
      return res.status(404).json({ message: "No QR data found for this user." });
    }
    success_response(res , 200 , "success" , qrData)
  } catch (error) {
    console.error("Error retrieving QR data:", error);
    res.status(500).json({ message: "An error occurred while fetching QR data." });
  }
};

export { getData };
