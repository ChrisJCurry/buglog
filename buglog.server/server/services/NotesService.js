import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async find(query = {}) {
    const notes = await dbContext.Notes.find(query)
    return notes
  }

  async findById(id) {
    /*
      .populate goes to virtual field of Bug model
      'creator' is reference to virtual
      'name picture email' = properties of the model reference in virtual field

    */
    const note = await dbContext.Notes.findById(id).populate('creator', 'name picture email')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async create(newNote) {
    const res = await dbContext.Notes.create(newNote)

    return res
  }

  async edit(id, update) {
    const note = await this.findById(id)
    if (note.creatorId !== update.creatorId) {
      throw new BadRequest("You can't edit this.")
    }
    return await dbContext.Notes.findByIdAndUpdate(id, { body: update.body }, { new: true })
  }

  async delete(id, cId) {
    const res = await dbContext.Notes.findOneAndDelete({ _id: id, creatorId: cId })
    return res
  }
}

export const notesService = new NotesService()
