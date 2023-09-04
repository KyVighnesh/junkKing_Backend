const express = require("express")
const app = express()
const cors = require("cors")
const connect = require("./database/mongoose")
const url = "mongodb+srv://vighneshwars10:IltdHlWJHQDKu2Yu@cluster0.teuy68p.mongodb.net/"
const User = require("./database/Schema/User")
const {createUser,signIn,getUser,updateProducts,updateTotal} = require("./controllers/authController")
const {encryptPassword} = require("./middlewares/middleware")
const Menu = require("./database/Schema/Menu")
var path = require('path');
var paypal = require('paypal-rest-sdk');
var totalAmount = 10;



const port = 8090


app.use(cors())
app.use(express.json())



app.post("/signup",encryptPassword,createUser)

app.post("/logIn",signIn)


app.get("/getMenu",(req,res)=> {
    Menu.find().then(data=> {
        res.json({
            menu:data
        })
    })
})

app.post("/user",getUser)

app.put("/:email",updateProducts)

app.put("/:id",updateTotal)

app.post("/getTotal",(req,res)=> {
    User.find({email:req.body.email}).then(data=> {

        totalAmount = data[0].total

        res.json({
            message:data
        })

    })
})



paypal.configure({
    'mode': 'sandbox', //sandbox or live 
    'client_id': 'Ad-tajga6JnQ6j4FN4d9H77GGykH-BgLwuXDtaZuNakyaQrtQ_EP0ouMoXB42m4L3Be9xoakxjvcVkAb', // please provide your client id here 
    'client_secret': 'ECQmi8R85ARGPS-OV_d2zIBX_fmLpq05lFRbrfjdLWLr9yOQQfk3DOuz9Lkddzums3qsoOQXCvFCNuyT' // provide your client secret here 
  });
  
  
  // set public directory to serve static html files 
  app.use('/', express.static(path.join(__dirname, 'public'))); 
  
  
  // redirect to store when user hits http://localhost:3000
//   app.get('/' , (req , res) => {
//       res.redirect('/index.html'); 
//   })
  
  // start payment process 
  app.get('/buy' , ( req , res ) => {
      // create payment object 
      var payment = {
              "intent": "authorize",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://127.0.0.1:3000/success",
          "cancel_url": "http://127.0.0.1:3000/err"
      },
      "transactions": [{
          "amount": {
              "total": totalAmount,
              "currency": "USD"
          },
          "description": " a book on mean stack "
      }]
      }
      
      
      // call the create Pay method 
      createPay( payment ) 
          .then( ( transaction ) => {
              var id = transaction.id; 
              var links = transaction.links;
              var counter = links.length; 
              while( counter -- ) {
                  if ( links[counter].method == 'REDIRECT') {
                      // redirect to paypal where user approves the transaction 
                      return res.redirect( links[counter].href )
                  }
              }
          })
          .catch( ( err ) => { 
              console.log( err ); 
              res.redirect('/err');
          });
  }); 
  
  
  // success page 
  app.get('/success' , (req ,res ) => {
      console.log(req.query); 
      res.redirect('/success.html'); 
  })
  
  // error page 
  app.get('/err' , (req , res) => {
      console.log(req.query); 
      res.redirect('/err.html'); 
  })
  
  
  
  
  
  // helper functions 
  var createPay = ( payment ) => {
      return new Promise( ( resolve , reject ) => {
          paypal.payment.create( payment , function( err , payment ) {
           if ( err ) {
               reject(err); 
           }
          else {
              resolve(payment); 
          }
          }); 
      });
  }		





connect(url).then(data=> {
    console.log("database connected")
})



app.listen(port,()=> {
    console.log(`server is connected at ${port}`)
})
