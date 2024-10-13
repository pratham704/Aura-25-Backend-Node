import {
    success_response,
    fail_response,
} from "../utils/responses/responses.js";
import User from "../models/users.model.js";
import EntryExit from "../models/entryExit.model.js"



const getStudentStatistics = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({});
        const totalPaidStudents = await User.countDocuments({ paymentStatus: true });

        success_response(res, 200, "Student statistics retrieved successfully", {
            statistics: {
                total: {
                    count: totalStudents,
                    description: "Total registered students"
                },
                paid: {
                    count: totalPaidStudents,
                    description: "Total paid students"
                },
                unpaid: {
                    count: totalStudents - totalPaidStudents,
                    description: "Total unpaid students"
                }
            }
        });
    } catch (error) {
        console.error("Error retrieving student statistics:", error);
        fail_response(res, 500, "Internal server error");
    }
};


const getEntryExitStatistics = async (req, res) => {
    try {
        const totalEntries = await EntryExit.aggregate([
            { $group: { _id: null, totalEntry: { $sum: "$frequencyEntry" } } }
        ]);

        const totalExits = await EntryExit.aggregate([
            { $group: { _id: null, totalExit: { $sum: "$frequencyExit" } } }
        ]);

        const activeUsers = await EntryExit.countDocuments({ currentStatus: true });
        const vipUsersCount = await EntryExit.countDocuments({ vip: true });
        const statistics = {
            totalEntries: totalEntries[0]?.totalEntry || 0,
            totalExits: totalExits[0]?.totalExit || 0,
            activeUsers,
            vipUsersCount
        };

        success_response(res, 200, "Entry and exit statistics retrieved successfully", statistics);
    } catch (error) {
        console.error("Error retrieving entry/exit statistics:", error);
        fail_response(res, 500, "Internal server error");
    }
};


export {  getStudentStatistics , getEntryExitStatistics };



