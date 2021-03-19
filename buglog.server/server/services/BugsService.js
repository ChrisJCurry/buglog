import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'

class BugsService {
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query)
    return bugs
  }

  async findById(id) {
    const value = await dbContext.Values.findById(id)
    if (!value) {
      throw new BadRequest('Invalid Id')
    }
    return value
  }

  async create(newBug) {
    try {
      const res = await dbContext.Bugs.create(newBug)
      return res
    } catch (err) {
      logger.error(err)
    }
  }
}

export const bugsService = new BugsService()
