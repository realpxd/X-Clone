require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000
const uri = process.env.ATLAS_URI



const connectDB = async () => {
    console.log('Connecting to MongoDB with URI:', uri);
    try {
        await mongoose.connect(uri)
            .then(() => console.log('"Connected to database"'))
            .catch((err) => {
                console.log('Error connecting to database: ', err);
                console.log('Retrying connection in 5 seconds...');
                console.log('Connecting to MongoDB with URI:', uri);
                setTimeout(() => {
                    connectDB()
                }, 5000);
            })
    } catch (err) {
        console.log('Error connecting to database: ', err);
        console.log('Retrying connection in 5 seconds...');
        console.log('Connecting to MongoDB with URI:', uri);
        setTimeout(() => {
            connectDB()
        }, 5000);
    }
}
connectDB()
// const db = mongoose.connection;
const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3
    },
    fullname: {
        type: String,
        minlength: 3
    },
    email: {
        type: String,
        minlength: 3
    },
    password: {
        type: String,
        minlength: 3
    }
}, {
    timestamps: true,

})

const postsSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3
    },
    fullname: {
        type: String,
        minlength: 3
    },
    email: {
        type: String,
        minlength: 3
    },
    post: {
        type: String,
        minlength: 3
    },
    image: {
        type: String,
        minlength: 3
    },
    likes: {
        type: Number,
        minlength: 0
    },
    comments: {
        type: Number,
        minlength: 0
    },
    reposts: {
        type: Number,
        minlength: 0
    },


}, {
    timestamps: true,

})


const NewUser = mongoose.model('users', usersSchema);
const NewPosts = mongoose.model('posts', postsSchema);

app.get('/', (req, res) => {
    //fetch all posts and send it on res
    const getAllPosts = async () => {
        try {
            const allPosts = await NewPosts.find();
            res.send(allPosts)
        } catch (err) {
            console.log(err)
            res.send(false)
            res.status(405).json('Error: ' + err);
        }
    }
    getAllPosts()
})

app.post('/addUser', (req, res) => {
    const username = req.body.Username
    const fullname = req.body.Name
    const email = req.body.Email
    const password = req.body.Password
    const addUserFunc = async () => {
        try {
            const newUser = new NewUser({
                username,
                fullname,
                email,
                password
            })

            // const savedUsers = await db.findOne({ email: req.body.Email });
            // find savedUsers with the same email 
            const savedUsers = await NewUser.find({
                email: req.body.Email
            });

            if (savedUsers.length > 0) {
                console.log(`${req.body.Email} already exists`);
                res.send(false);
            } else {
                const response = await newUser.save()
                    // .then(() => res.json('User added!'))
                    .then(() => console.log("user added " + username))
                    .catch(err => res.status(405).json('Error: ' + err));
                response ? console.log(`${username} added successfully`) : console.log(`Error saving user data.`)

                const curUser = await NewUser.find({
                    email: req.body.Email
                });
                if (curUser.length > 0) {
                    if (curUser[0].password === password) {
                        console.log(`${req.body.Email} found`);
                        res.send(curUser[0])
                    }
                }
            }

        } catch (err) {
            console.log(err)
            res.send(false)
        }
    }
    addUserFunc()
})

app.post('/loginUser', (req, res) => {
    const email = req.body.Email
    const password = req.body.Password
    const loginUserFunc = async () => {
        try {
            const savedUsers = await NewUser.find({
                email: req.body.Email
            });
            if (savedUsers.length > 0) {
                console.log(`${req.body.Email} exists`);
                if (savedUsers[0].password === password) {
                    console.log(`${req.body.Email} logged in`);
                    res.send(savedUsers[0])
                } else {
                    console.log(`${req.body.Email} wrong password`);
                    res.send(false)
                }
            } else {
                console.log(`${req.body.Email} doesn't exist`);
                res.send(false)
            }
        } catch (err) {
            console.log(err)
            res.send(false)
        }
    }
    loginUserFunc()
})
app.post('/getUser', (req, res) => {
    const email = req.body.Email
    const getUserFunc = async () => {
        try {
            const savedUsers = await NewUser.find({
                email: req.body.Email
            });
            if (savedUsers.length > 0) {
                console.log(`${req.body.Email} exists`);
                res.send(savedUsers[0])
            } else {
                console.log(`${req.body.Email} doesn't exist`);
                res.send(savedUsers)
            }
        }
        catch (err) {
            console.log(err)
            res.send(false)
        }
    }
    getUserFunc()
})

app.post('/createPost', (req, res) => {
    const username = req.body.userData.username
    const fullname = req.body.userData.fullname
    const email = req.body.userData.email
    const post = req.body.post
    const image = req.body.post
    const likes = 0
    const comments = 0
    const reposts = 0
    console.log(username, fullname, email, post, image, likes, comments, reposts)
    const createPostFunc = async () => {
        try {
            const newPost = new NewPosts({
                username,
                fullname,
                email,
                post,
                image,
                likes,
                comments,
                reposts
            })

            const isPostAdded = await newPost.save()
                .then(() => console.log("post added " + username))
                .then(() => res.send(true))
                .catch(err => res.status(405).json('Error: ' + err));
            isPostAdded ? console.log(`${post} added successfully`) : console.log(`Error saving post data.`)
            // response ? res.send(true) : res.send(false)
        } catch (err) {
            console.log(err)
            res.send(false)
        }
    }
    createPostFunc()
})

app.post('/likePost', (req, res) => {
    const id = req.body.id
    const likes = req.body.likes
    const likePostFunc = async () => {
        try {
            const updatePost = await NewPosts.findByIdAndUpdate(id, {
                likes: likes + 1
            })
            const isPostUpdated = await updatePost.save()
                .then(() => console.log("post updated " + id))
                .then(() => res.send(true))
                .catch(err => res.status(405).json('Error: ' + err));
            isPostUpdated ? console.log(`${id} updated successfully`) : console.log(`Error updating post data.`)
            // response ? res.send(true) : res.send(false)
        } catch (err) {
            console.log(err)
            res.send(false)
        }
    }
    likePostFunc()
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
