import User from "../../model/user"

const updateVerify = async (id, status) => {
    return await User.updateOne({ _id: id }, {
        verify: status,
        verificationToken: null,
    })
}

export default  updateVerify