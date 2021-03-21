import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { Bug } from '../models/Bug'

class BugsService {
  async getAll() {
    try {
      const res = await api.get('api/bugs')

      AppState.bugs = res.data.map(b => new Bug(b))
    } catch (error) {
      logger.log(error)
    }
  }

  async getById(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.bug = res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async getCreator(bug) {
    try {
      const res = await api.get('api/bugs/' + bug.id)
      bug.creator = res.data.creator.name
    } catch (err) {
      logger.error(err)
    }
  }

  async create(bug) {
    try {
      delete bug.id
      const res = await api.post('api/bugs', bug)
      AppState.bugs.push(res.data)
      return res.data._id
    } catch (err) {
      logger.error(err)
    }
  }

  async edit(bug) {
    try {
      await api.put('api/bugs/' + bug._id, bug)
    } catch (err) {
      logger.error(err)
    }
  }

  async delete(id) {
    const res = window.confirm('are you sure you want to close your bug?')
    if (!res) {
      return
    }
    try {
      await api.delete('/api/bugs/' + id)
      this.getAll()
    } catch (err) {
      logger.error(err)
    }
  }

  getDate(id) {
    const bug = AppState.bugs.find(b => b.id === id)
    if (bug) {
      const date = bug.createdAt
      const updatedDate = new Date(date)
      const year = updatedDate.getFullYear()
      const month = (this.fixLowNumber(updatedDate.getMonth() + 1))
      const day = this.fixLowNumber(updatedDate.getDate())
      const hour = this.fixLowNumber(updatedDate.getHours())
      const minute = this.fixLowNumber(updatedDate.getMinutes())
      const newDate = `${month}-${day}-${year} ${hour}:${minute}`
      return newDate
    }

    return 0
  }

  fixLowNumber(n) {
    return (n < 10 ? '0' : '') + n
  }
}
export const bugsService = new BugsService()
