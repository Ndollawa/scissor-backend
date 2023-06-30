import NoteModel from '../../Models/Note'
// import UserModel from '../../Models/User'
import {Request, Response} from 'express'
import BaseController from './BaseController'



class NoteController extends BaseController {
    constructor(){
        super(NoteModel)   

   }

// @desc Get all notes 
// @route GET /notes
// @access public
 public selectAll = async (req:Request, res:Response) => {
    // Get all notes from MongoDB
    const note = await NoteModel.find().lean()

    // If no notes 
    if (!note?.length) {
        return res.status(400).json({ message: 'No note found' })
    }

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    // const noteWithUser = await Promise.all(note.map(async (note) => {
    //     const user = await User.findById(NoteModel.user).lean().exec()
    //     return { ...note, username: user.username }
    // }))

    res.json(note)
}

// @desc Create new note
// @route POST /note
// @access authorized user
 public create = async (req:Request, res:Response) => {
    const { title, description, body, status } = req.body
    const file = req.file!
    // Confirm data
    if (!body || !title || !status || !req.file) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await NoteModel.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    // Create and store the new user 
    const note = await NoteModel.create({ title,description,body,image:file.filename })

    if (note) { // Created 
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }

}

// @desc Update a note
// @route PATCH /note
// @access authorized user
public update = async (req:Request, res:Response) => {
    const {title, description,_id,status,body } = req.body
const image = req?.file!
    // Confirm data
    if (!title || !description) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const note = await NoteModel.findById({_id}).exec()

    if (!note) {
        return res.status(400).json({ message: 'note not found' })
    }

    // Check for duplicate title
    const duplicate = await NoteModel.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== _id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    note.body = body
    note.title = title
    // if(image)note.image = image.filename
    
    // note.description = description
    note.status = status

    const updatedNote = await note.save()

    res.json(`'${updatedNote.title}' updated`)
}

// @desc Delete a note
// @route DELETE /note
// @access authorized user
public delete = async (req:Request, res:Response) => {
    const { _id } = req.body

    // Confirm data
    if (!_id) {
        return res.status(400).json({ message: 'Note ID required' })
    }

    // Confirm note exists to delete 
    const note = await NoteModel.findById(_id).exec()

    if (!note) {
        return res.status(400).json({ message: 'note not found' })
    }

    const result = await NoteModel.deleteOne()

    res.status(200).json({message:"success"})
}

}

export default new NoteController();