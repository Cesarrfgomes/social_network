import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const secretPass = process.env.JWT_PASSWORD as string

export class LoginController {
    async post(req: Request, res: Response) {
        const { username, password } = req.body

        try {
            const usernameExist = await User.findOne({ username })

            if (!usernameExist) {
                return res.status(403).json({ message: "Username ou senha incorretos!" })
            }

            const authPassword = await bcrypt.compare(password, usernameExist.password as string)

            if (!authPassword) {
                return res.status(403).json({ message: "Username ou senha incorretos!" })
            }

            const token = jwt.sign({ id: usernameExist._id }, secretPass, { expiresIn: '8h' })

            return res.status(200).json({ usernameExist, token })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Erro interno do servidor." })
        }
    }
}