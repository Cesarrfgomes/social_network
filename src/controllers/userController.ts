import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'

export class UserController {
    async get(req: Request, res: Response) {
        try {
            const users = await User.find()

            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." })
        }
    }

    async show(req: Request, res: Response) {
        const { _id } = req.user
        try {
            const user = await User.findOne({ _id })

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." })
        }
    }

    async create(req: Request, res: Response) {
        const { name, email, username, password, photo, description } = req.body

        try {
            const existUserEmailOrUsername = await User.findOne({
                $or: [{ email }, { username }]
            })

            if (existUserEmailOrUsername) {
                return res.status(400).json({ message: "Username ou email já está em uso." })
            }

            const encryptedPassword = await bcrypt.hash(password, 10)

            const newUser = await User.create({
                name,
                email,
                username,
                password: encryptedPassword,
                photo,
                description,
                isActive: true,
                isVerified: false,
                createdAt: new Date
            })

            if (!newUser) {
                return res.status(400).json({ message: "Nao foi possivel cadastrar o usuário." })
            }

            return res.status(201).json(newUser)
        } catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." })
        }
    }

    async update(req: Request, res: Response) {
        const { name, email, username, password, photo, description } = req.body
        const { id } = req.params
        try {
            const existUserEmailOrUsername = await User.findOne({
                $or: [{ email, _id: { $ne: id } }, { username, _id: { $ne: id } }]
            })

            if (existUserEmailOrUsername) {
                return res.status(400).json({ message: "Username ou email já está em uso." })
            }

            const encryptedPassword = await bcrypt.hash(password, 10)

            await User.updateOne({ _id: id }, {
                name,
                email,
                username,
                password: encryptedPassword,
                photo,
                description
            })



            return res.status(204).json()
        } catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." })
        }
    }

    async inactive(req: Request, res: Response) {
        const { id } = req.params
        try {
            const user = await User.findById(id)

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." })
            }

            await User.updateOne({ _id: id }, {
                isActive: false
            })

            return res.status(204).json()
        } catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." })
        }
    }
}
