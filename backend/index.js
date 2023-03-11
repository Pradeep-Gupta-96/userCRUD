import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
const PORT = 4000;

const database = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect("mongodb://127.0.0.1:27017/CRUD", () => {
            console.log("database connected")
        })
    } catch (error) {
        console.log(error)
    }
}
database()

const newSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
})
const User = new mongoose.model("users", newSchema)


app.get('/', (req, res) => {

      User.find((error, item) => {
        if (error) return res.status(404).json({ message: error })
        return res.status(202).json(item)
    })
})

app.post('/signup', async (req, res) => {
    const { username, password, role } = req.body
    try {
        if (!username || !password) {
            return res.status(404).json({ message: "something is missing" })
        } else {
            const userexit = await User.findOne({ username: username })
            if (userexit) {
                return res.status(404).json({ message: "this username is allready register" })
            } else {
                const user = new User({ username, password, role })
                await user.save()
                return res.status(200).json({ message: "registration successfull" })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})

app.post('/signin', async (req, res) => {
    const { username, password } = req.body
    try {
        if (!username || !password) {
            return res.status(404).json({ message: "might be you skip something" })
        } else {
            const userexit = await User.findOne({ $and: [{ username: username }, { password: password }] })
            if (userexit) {
                return res.status(202).json({ message: userexit })
            } else {
                return res.status(404).json({ message: "please register yourself" })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})

const newSchema1 = new mongoose.Schema({
    name: String,
    department: String,
    year: String
})
const Students = new mongoose.model('students', newSchema1)

app.get('/api/students', (req, res) => {
    Students.find((error, students) => {
        if (error) return res.status(404).json({ message: error })
        res.status(404).json(students)
    })
})

app.get('/api/students/:id',async (req, res) => {
    try {
        const id=req.params.id
        const user=await Students.findById(id)
        if(user){
            return res.status(202).json(user)
        }else{
            return res.status(404).json({message:"user not found"})
        }
    } catch (error) {
    return res.status(500).json({ message: error })
    }
   
})


app.post('/api/students', async (req, res) => {
    const { name, department, year } = req.body
    try {
        if (!name || !department || !year) {
            return res.status(404).json({ message: "might be you skip something" })
        } else {
            const user = await Students.findOne({ $and: [{ name: name }, { department: department }] })
            if (!user) {
                const students = new Students({ name, department, year })
                await students.save()
                return res.status(200).json({ message: "Save" })
            } else {
                return res.status(404).json({ message: "you are already register" })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})

app.put('/api/students/:id', async (req, res) => {
    try {
        const id = req.params.id
        const students = await Students.findByIdAndUpdate(id, req.body, {
            new: true
        })
        if (students) return res.status(202).json({ message: "succcess"})
        return res.status(404).json({ message: "user not found" })
    } catch (error) {
        return res.status(500).json({ message:error})
    }
})

app.delete('/api/students/:id', async (req, res)=>{
    try {
        const id=req.params.id
        const students=await Students.findByIdAndDelete(id,{
            new:true
        })
        if(students) return res.status(202).json({message:"succcess"})   
        return res.status(404).json({ message:"user not found"})   
    } catch (error) {
        return res.status(500).json({ message:error})   
    }
})

app.listen(PORT, () => {
    console.log(`server running at  port ${PORT}`)
})
