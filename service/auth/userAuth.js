import jwt from 'jsonwebtoken'
import {
    createUser,
    findByEmail,
    findById,
    updateToken
} from '../../repository/usersRepository'
 
const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService{ 
    async isUserExist(email) {
        const user = await findByEmail(email)
        return !!user
    }

     async create(body) {
        const {email, subscription, avatar} = await createUser(body)
        return {
            email,
            subscription,
            avatar,
        }
    }
    
    async getUser(email, password) {
        const user = await findByEmail(email)
        const isValidPassword = await user?.isValidPassword(password)
        if (!isValidPassword) {
            return null
        }
        return user
    }

    getToken(user) {
        const {id,email} = user
        const payload = { id,email }
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1y'})
        return token
    }
  
    async setToken(id, token) {
      await updateToken(id,token) 
    }

    async getCurrentUser(userId) {
        const { email, subscription } = await findById(userId)
        return {email,subscription}
    }
}

export default new AuthService()