
const User =  require("../database/Schema/User")

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

const createUser = (req,res,next) => {

    User.findOne({email:req.body.email}).then(data => {
        if(data) {

            next(new Error("User already Exist"))

        }

        else {

            Menu.find().then(data => {

                for(let i=0; i<data.length; i++) {
                    data[i]._doc = {...data[i]._doc,quantity:0}

                    console.log(data)
                }


                

                req.body.products = data

               

                var user = new User(req.body)

            user.save()

            res.json({
                status:"success",
                message:"user created"
            })


            })


        }
    })

}


const signIn = (req,res,next) => {
    User.findOne({email:req.body.email}).then(user=>{
       if(user){
          // for the password comparison

          bcrypt.compare(req.body.password, user.password, function(err, result) {
           if(!result){
               next(new Error("Please enter correct username or password"))
           }else{
               const  token = jwt.sign({email:req.body.email}, "shhh");
           res.json({
                status:"Success",
                token:token,
                message:"User Logged In"
        
            })

             process.env.EMAIL = req.body.email

             console.log(process.env.EMAIL)


             
           }
       
       });

          
       }else{



         
           next(new Error("User Not found"));
       }

   })

}


const getUser = (req,res) => {

    User.findOne({email:req.body.email}).then(data => {
        res.json({
            currentUser:data
        })
    })

}


const updateProducts = (req,res)=> {

    User.updateOne({email:req.params.email},{$set:{...req.body}}).then(data=> {
        res.json({
            message:data
        })
    })

}


const updateTotal = (req,res) => {
    User.updateOne({email:req.params.email},{$set:{...req.body}}).then(data=> {
        res.json({
            message:data
        })
    })

}



module.exports = {
    createUser,
    signIn,
    getUser,
    updateProducts,
    updateTotal
}
