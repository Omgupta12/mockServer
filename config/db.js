const mongoose=require("mongoose")

const connect = async () => {
    mongoose.set('strictQuery', false)
    return mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(console.log("connected to db"))
    .catch(e => console.log(e))
}

module.exports = connect