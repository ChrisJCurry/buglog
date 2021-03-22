import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { Note } from '../models/Note'

class NotesService {
  async getCreator(note) {
    try {
      const res = await api.get('api/notes/' + note.id)
      note.creator = res.data.creator.name
    } catch (err) {
      logger.error(err)
    }
  }

  async getByBugId(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId + '/notes')
      AppState.notes = res.data.map(n => new Note(n))
      AppState.notes.forEach(n => this.getCreator(n))
      logger.log(AppState.notes)
    } catch (err) {
      logger.error(err)
    }
  }

  async create(note) {
    try {
      delete note.id

      const res = await api.post('api/notes', note)
      AppState.notes.push(res.data)
      return res.data._id
    } catch (err) {
      logger.error(err)
    }
  }

  async edit(note) {
    try {
      await api.put('api/notes/' + note._id, note)
    } catch (err) {
      logger.error(err)
    }
  }

  async delete(note) {
    const res = window.confirm('are you sure you want to delete your note?')
    if (!res) {
      return
    }
    try {
      await api.delete('/api/notes/' + note.id)
      logger.log('indexOf: ', (AppState.notes.indexOf(note)), (AppState.notes.indexOf(note) + 1))
      AppState.notes.splice(AppState.notes.indexOf(note), 1)
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
export const notesService = new NotesService()
