import TodoModel from '../../Models/Todo.js'
// import UserModel from '../../Models/User'
import {Request, Response} from 'express'
import BaseController from './BaseController.js'



class TodoController extends BaseController {
    constructor(){
        super(TodoModel)   

   }

// @desc Get all todo 
// @route GET /todo
// @access public
 public selectAll = async (req:Request, res:Response) => {
    // Get all todo from MongoDB
    const todo = await TodoModel.find().lean()

    // If no todo 
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
    const { todo,  status } = req.body
    // Confirm data
    if ( !todo) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate todo
    const duplicate = await TodoModel.findOne({ todo }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate todo todo' })
    }

    // Create and store the new user 
    const Todo = await TodoModel.create({ todo,status })

    if (Todo) { // Created 
        return res.status(201).json({ message: 'New todo created' })
    } else {
        return res.status(400).json({ message: 'Invalid todo data received' })
    }

}

// @desc Update a todo
// @route PATCH /todo
// @access authorized user
public update = async (req:Request, res:Response) => {
    const {todo, _id,status} = req.body
const image = req?.file!
    // Confirm data
    if (!todo) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm todo exists to update
    const Todo = await TodoModel.findById({_id}).exec()

    if (!Todo) {
        return res.status(400).json({ message: 'todo not found' })
    }

    // Check for duplicate todo
    const duplicate = await TodoModel.findOne({ todo }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== _id) {
        return res.status(409).json({ message: 'Duplicate note todo' })
    }

    Todo.todo = todo
    Todo.status = status

    const updatedTodo = await Todo.save()

    res.json(`'${updatedTodo.todo}' updated`)
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