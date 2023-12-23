import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import User from '../models/User'

const secretPassword = 'minhasenhasegura'

export interface userId extends JwtPayload {
    id: string;
}

export const authToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    try {
        const token = authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(403).json({ mensagem: "Acesso negado." })
        }

        const { id } = <userId>jwt.verify(token, secretPassword);

        const userExist = await User.findById(id)

        if (!userExist) {
            return res.status(404).json({ mensagem: "Não autorizado." })
        }


        req.user = userExist

        next();
    } catch (err) {
        res.status(401).json({ message: "Please authenticate" });
    }
};

export default secretPassword