import { Router } from 'express'
import { UserController } from './controllers/userController'
import { PostController } from './controllers/postController'

const routes = Router()

routes.post('/user', new UserController().create)
routes.get('/user', new UserController().get)
routes.get('/user/:id', new UserController().show)
routes.put('/user/:id', new UserController().update)
routes.patch('/user/:id/inactive', new UserController().inactive)

routes.post('/post', new PostController().create)
routes.get('/post', new PostController().get)

export default routes