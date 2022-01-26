import User from "../../model/user"

const findByVerifyToken = async (verificationToken) => {
    return await User.findOne({verificationToken})
}


export default findByVerifyToken