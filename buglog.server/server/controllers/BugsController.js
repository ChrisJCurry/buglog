import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const bugs = await bugsService.find()
      res.send(bugs)
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      logger.log('create: ', req.body)
      const bug = await bugsService.create(req.body)
      logger.log('create: ', bug)
      res.send(bug)
    } catch (err) {
      next(err)
    }
  }
}
