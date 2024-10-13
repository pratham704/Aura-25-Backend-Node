import { success_response, fail_response } from "../utils/responses/responses.js"
import User from "../models/users.model.js"
const healthCheck = (req, res) => {

    success_response(res, 200, "server is healthy")

}

const getallStudents = async(req, res) => {

    const data = await User.find() ;
    success_response(res , 200 , "success" , data )


}

export { healthCheck , getallStudents }