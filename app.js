const express = require('express')
const app = express()
const port = process.env.PORT||3000


const path=require('path')
 const publicdirectory =path.join(__dirname,'./public')
 app.use(express.static(publicdirectory ))
app.use(express.json())
app.set('view engine', 'hbs');
//to read view  inside hbs
const viewDirectory=path.join(__dirname,'./hbs/views')
app.set('views',viewDirectory)
    //to read partials
var hbs=require('hbs')
const partialsPath=path.join(__dirname,"./hbs/partials")
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => res.render('index',{
  
   welcomemessage:" welcome to the home page"
})
)
app.get('/checkWeather',(req,res)=>{
    res.render('weather',
      
    )
    })
const geocode = require('./tools/geocode')
const forecast = require('./tools/forecastFile')

app.get('/weather',(req,res)=>{
  

   
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            // shorthand property error:error
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:req.query.address,
                latitude:data.latitude,
                longitude:data.longitude
            })
        })
    })
    
})


/////////////////////////////////////////////////////////////////////////////

  app.get('*' , (req , res)=> {
     res.send('404 Page Not Founded')
  })

app.listen(port, () => console.log(`Example app listening at http://localhost:3000`))