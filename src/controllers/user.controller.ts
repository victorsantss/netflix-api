import { Request } from "express"
import HTTP_STATUS from "../enums/http-status.enum"
import logger from "../infrastructure/logger/logger"
import { CustomRequest } from "../interfaces"
import { CustomResponse } from "../interfaces/custom-response.interface"
import { UserService } from "../services"

const userService = new UserService()
const winstonLogger = logger({ controller: "UserController" });

class UserController {
  public static async create(request: Request, response: CustomResponse) {
    const { body } = request
    try {
      const user = await userService.create(body)

      response.status(HTTP_STATUS.CREATED).json({
        id: user.id,
        email: user.email
      })
    } catch (e) {
      winstonLogger.error(`Erro ao criar usuário! Dados: ${JSON.stringify(body)}`)
      response.errorHandler && response.errorHandler(e)
    }
  }

  public static async getUserInfo(request: CustomRequest, response: CustomResponse) {
    try {
      const id = request.loggedUser!.id
      const userInfo = await userService.listUserInfo(+id)

      response.json(userInfo)
    } catch (e) {
      response.errorHandler && response.errorHandler(e)
    }
  }
}

export default UserController
