import { Repository } from "typeorm";
import { AppDataSource } from "../infrastructure/database/data-source";
import { Show } from "../entities";
import User from "../entities/user.entity";
import BadRequestException from "../exceptions/bad-request.exception";
import NotFoundException from "../exceptions/not-found.exception";

class ListService {
  userRepository: Repository<User>;
  showRepository: Repository<Show>;

  constructor() {
    this.showRepository = AppDataSource.getRepository(Show)
    this.userRepository = AppDataSource.getRepository(User)
  }

  private isMovieInList(showId: number, user: User) {
    return user.list.filter((show) => show.id === showId).length > 0
  }

  async add(showId: number, user: User) {
    if (this.isMovieInList(showId, user)) {
      throw new BadRequestException("Filme já adicionado")
    }

    const show = await this.showRepository.findOne({ where: { id: showId } })

    if (!show) {
      throw new BadRequestException(`O Show id -> ${showId} não foi encontrado!`)
    }

    user.list = [...user.list, show];

    return this.userRepository.save(user)
  }

  remove(showId: number, user: User) {
    if (user.list.some(show => show.id === showId)) {
      const newUserList = user.list.filter(show => show.id !== showId)

      return this.userRepository.save({
        ...user,
        list: newUserList
      })
    }
      throw new NotFoundException(`O show id: ${showId} não foi encontrado nessa lista`)
  }
}

export default ListService
