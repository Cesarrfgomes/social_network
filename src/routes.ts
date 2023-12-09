import {Router} from 'express'

const routes= Router()

routes.get('/', (req, res) =>{
    return res.json("Tudo certo")
})

export default routes