import path from 'path'
import fs from 'fs/promises'
import { updateAvatar } from '../../repository/usersRepository'

class LocalStorage{
    constructor(file, user) {
        this.userId = user.id  
        this.filename = file.filename
        this.filePath = file.path
        this.folderAvatars = process.env.FOLDER_FOR_AVATAR
    }

    async save() {
        const destination = path.join(this.folderAvatars, this.userId)
        await fs.mkdir(destination, { recursive: true })
        await fs.rename(this.filePath, path.join(destination, this.filename))
        const avatarUrl = path.normalize(path.join(this.userId, this.filename))
        await updateAvatar(this.userId,avatarUrl)
        return avatarUrl
    }
    
}

export default LocalStorage