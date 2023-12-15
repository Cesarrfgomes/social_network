import { Request, Response } from 'express'
import Post from '../models/Post'
import User from '../models/User'

export class PostController {
    async create(req: Request, res: Response) {
        const { user_id, description, images } = req.body
        try {
            const user = await User.findById(user_id)

            if (!user) {
                return res.status(404).json({ message: "O usuário não foi encontrado!" })
            }

            const newPost = await Post.create({
                user_id: user._id,
                description,
                images,
                likes: 0,
                comments: []
            })

            return res.status(201).json(newPost)
        } catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." })
        }
    }

    async get(req: Request, res: Response) {
        try {
            const posts = await Post.find()
            return res.status(200).json(posts)
        } catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." })
        }
    }

    async show(req: Request, res: Response) {
        const { id } = req.params
        try {
            const post = await Post.findById(id)

            if (!post) {
                return res.status(404).json({ message: "Postagem não encontrada." })
            }

            return res.status(200).json(post)
        } catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." })
        }
    }

    async update(req: Request, res: Response) {
        const { description } = req.body
        const { id } = req.params
        try {
            const post = await Post.findById(id)

            if (!post) {
                return res.status(404).json({ message: "Postagem não encontrada." })
            }

            await Post.updateOne({ _id: id }, {
                description
            })

            return res.status(204).json()
        } catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." })
        }
    }
    async excluir(req: Request, res: Response) {
        const { id } = req.params
        try {
            const post = await Post.findById(id)

            if (!post) {
                return res.status(404).json({ message: "Postagem não encontrada." })
            }

            await Post.deleteOne({ _id: id })

            return res.status(204).json()
        } catch (error) {
            return res.status(500).json({ message: "Erro interno do servidor." })
        }
    }

}