const express=require('express')
const app=express()
require('./config/db')
const validUrl=require('valid-url')
const shortid=require('shortid')
const config=require('config')
const path=require('path')
//const hbs=require('hbs')
const bodyParser=require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//connectdb()
app.use(express.json({extended:false}))
const index=require('./routes/index')
// const pathView=path.join(__dirncame,'/views')
// app.set('views',pathView)
app.set('view engine','ejs')
 app.set('views',path.join(__dirname,'views'))
//const url=require('./routes/url')
app.use(express.static('public'))
//app.use(url)
app.use('/short',index)
const URL=require('./models/url')
app.get('/api/url/shorten',(req,res)=>{
    res.render('index')
})
app.post('/api/url/shorten',urlencodedParser,async (req,res)=>
{
    console.log( req.body)
   
   const{longUrl}=  req.body
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
const PORT=5000;
app.listen(PORT,()=>console.log(`server is up on ${PORT}`))
