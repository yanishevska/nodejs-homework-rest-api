import { HttpCode } from "../../lib/constants"
import MESSAGES from "../../lib/messages/messages"
import {
    LocalStorage,
    UploadStorage,
    CloudStorage,
} from "../../service/fileStorage"

const uploadAvatar = async (req, res, next) => {
    const uploadService = new UploadStorage(
        LocalStorage,
        req.file,
        req.user)
    const avatarUrl = await uploadService.updateAvatar()
    res
        .status(HttpCode.OK)
        .json({
            status: 'success',
            code: HttpCode.OK,
            message: MESSAGES.SUCCESS,
            data: { avatarUrl }
        })
}

export default uploadAvatar