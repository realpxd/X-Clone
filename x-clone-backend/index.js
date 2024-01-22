require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000
const uri = process.env.ATLAS_URI

var i = 0;

const logsEnv = async () => {
        if(i == 10) return;
        console.log("Mongo uri: " + uri);
        i++;
}

setInterval(logsEnv,900)

app.get("/", (req,res) => {
        res.send("Testing")
})

app.listen(port,()=>{
        console.log("Server is running on: " + port)
})
