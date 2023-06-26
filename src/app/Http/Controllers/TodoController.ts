import TodoModel from '../../Models/Todo'
// import UserModel from '../../Models/User'
import {Request, Response} from 'express'
import BaseController from './BaseController'



class TodoController extends BaseController {
    constructor(){
        super(TodoModel)   

   }

// @desc Get all notes 
// @route GET /notes
// @access public
 public selectAll = async (req:Request, res:Response) => {
    // Get all notes from MongoDB
    const todo = await TodoModel.find().lean()

    // If no notes 
    if (!todo?.length) {
        return res.status(400).json({ message: 'No todo found' })
    }

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    // const todoWithUser = await Promise.all(todo.map(async (todo) => {
    //     const user = await User.findById(TodoModel.user).lean().exec()
    //     return { ...todo, username: user.username }
    // }))

    res.json(todo)
}

// @desc Create new todo
// @route POST /todo
// @access authorized user
 public create = async (req:Request, res:Response) => {
    const { title, description, status } = req.body
    const file = req.file!
    console.log(req.body)
    // Confirm data
    if (!description || !title || !status || !req.file) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await TodoModel.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate todo title' })
    }

    // Create and store the new user 
    const todo = await TodoModel.create({ title,description,image:file.filename,status })

    if (todo) { // Created 
        return res.status(201).json({ message: 'New todo created' })
    } else {
        return res.status(400).json({ message: 'Invalid todo data received' })
    }

}

// @desc Update a todo
// @route PATCH /todo
// @access authorized user
public update = async (req:Request, res:Response) => {
    const {title, description,_id,status} = req.body
const image = req?.file!
    // Confirm data
    if (!title || !description) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm todo exists to update
    const todo = await TodoModel.findById({_id}).exec()

    if (!todo) {
        return res.status(400).json({ message: 'todo not found' })
    }

    // Check for duplicate title
    const duplicate = await TodoModel.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== _id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    todo.title = title
    if(image)todo.image = image.filename
    
    todo.description = description
    todo.status = status

    const updatedTodo = await todo.save()

    res.json(`'${updatedTodo.title}' updated`)
}

// @desc Delete a todo
// @route DELETE /todo
// @access authorized user
public delete = async (req:Request, res:Response) => {
    const { _id } = req.body

    // Confirm data
    if (!_id) {
        return res.status(400).json({ message: 'Todo ID required' })
    }

    // Confirm todo exists to delete 
    const todo = await TodoModel.findById(_id).exec()

    if (!todo) {
        return res.status(400).json({ message: 'todo not found' })
    }

    const result = await TodoModel.deleteOne()

    res.status(200).json({message:"success"})
}

}

export default new TodoController();