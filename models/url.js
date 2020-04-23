const mongoose =require('mongoose')

const userSchema=new mongoose.Schema({
    urlCode:String,
    longUrl:String,
    shortUrl:String,
    date:{
        type:String,default:Date.now
    }
})

const Url=mongoose.model('Url',userSchema)

module.exports=Url