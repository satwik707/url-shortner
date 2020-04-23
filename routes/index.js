const express=require('express')
//const URL=require('./models/url.js')

const router=express.Router()
const URL=require('../models/url')

router.get('/:code',async (req,res)=>
{
    
    try{
        console.log("ghfh")
        
        const url= await URL.findOne({urlCode:req.params.code})
        if(url)
        {
            return  res.redirect(url.longUrl)
           
        }
        else{
            res.status(404).json("url not found ")
        }

    }catch(err)
    {
        console.error(err)
        res.status(500).json('server error')
    }
})

module.exports=router
