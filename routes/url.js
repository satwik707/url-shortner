const express=require('express')
//const URL=require('./models/url.js')
const validUrl=require('valid-url')
const shortid=require('shortid')
const config=require('config')
const bodyParser=require('body-parser')
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
const request = require('request');


var urlencodedParser = bodyParser.urlencoded({ extended: false })
const router=express.Router()

const URL=require('../models/url')
// @route -- /api/url/shorten
// @desc Create short url

router.post('/api/url/shorten',urlencodedParser,async (req,res)=>
{
   // return res.json(req.body)
   
   const{longUrl}=req.body
    const baseUrl=config.get('baseUrl')
    // console.log(res.json(longUrl))
    if(!validUrl.isUri(longUrl))
    {
        return res.status(404).json("url not taken from the form")
    }
         if(!validUrl.isUri(baseUrl))
         {
            
             return res.status(401).json("invalid code url")
         }
         else{
            
        const urlCode=shortid.generate()
       
            
                let url= await URL.findOne({longUrl:longUrl})
                try{
                if(url)
                {
                    
                    return res.status(200).json(url)
                }else{
                    const shortUrl=baseUrl+'/'+urlCode
                    url=new URL({
                        longUrl,
                        shortUrl,
                        urlCode,
                        date:Date.now()
                    })
                    await url.save()
                    console.log("ggugu")
                    res.json(url)
                }
            }catch(err)
            {
                res.status(500).json("internal server error")
            }
        }
       
})
module.exports=router
