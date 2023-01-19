require("dotenv").config()
const PORT=process.env.PORT || 8080

const express=require("express")
const connect=require("./config/db")
const userRoute=require("./routes/user.routes")
const bugRoute=require("./routes/bug.routes")
const cors=require("cors")
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json()) 
app.use(cors())

app.use("/user",userRoute)
app.use("/bug",bugRoute)


app.listen(PORT, async()=>{
    try{
        await connect()
        console.log(`listening server at port ${PORT}`)
    }
    catch(e){
        console.log("err",e)
    }
})