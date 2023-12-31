import { Router } from 'express'
import { UserController } from './controllers/userController'
import { PostController } from './controllers/postController'
import multer from './middlewares/multer'
import { LoginController } from './auth/LoginController'
import { authToken } from './middlewares/authToken'

const routes = Router()

routes.post('/login', new LoginController().post)

routes.post('/user', new UserController().create)

routes.use(authToken)

routes.get('/user', new UserController().get)
routes.get('/user/profile', new UserController().show)
routes.put('/user/:id', new UserController().update)
routes.patch('/user/:id/inactive', new UserController().inactive)

routes.post('/post', multer.array('images'), new PostController().create)
routes.get('/post', new PostController().get)
routes.get('/post/:id', new PostController().show)
routes.patch('/post/:id', new PostController().update)
routes.delete('/post/:id', new PostController().excluir)
routes.patch('/post/:id/like', new PostController().likePost)
routes.patch('/post/:id/comment', new PostController().commentPost)

export default routes