import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { bugsService } from '../services/BugsService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .put('/:id', this.edit)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const bugs = await bugsService.find()
      res.send(bugs)
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      const bug = await bugsService.findById(req.params.id)
      res.send(bug)
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      const bug = await bugsService.create(req.body)
      // @ts-ignore ESLint error. Think its a mongoose document. Runs fine.
      bug.creator = req.userInfo
      res.send(bug)
    } catch (err) {
      next(err)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      delete req.body.closed
      const bug = await bugsService.edit(req.params.id, req.body)
      res.send(bug)
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.creator = req.userInfo
      const bug = await bugsService.delete(req.params.id)
      res.send(bug)
    } catch (err) {
      next(err)
    }
  }
}
