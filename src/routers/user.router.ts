import express from "express"
import passport from "passport"
import { UserController } from "../controllers"
import injectUser from "../middlewares/inject-user.middleware"

import validationMiddleware from "../middlewares/validation.middleware"
import CreateUserSchema from "../schemas/create-user.schema"

const UserRouter = express.Router()

UserRouter.post("/user", validationMiddleware(CreateUserSchema), UserController.create)
UserRouter.get("/user/me", passport.authenticate('jwt', { session: false }), injectUser, UserController.getUserInfo)

export default UserRouter
