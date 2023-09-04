const bcrypt = require('bcrypt');


const encryptPassword=(req,res,next)=>{
    const saltRounds = 10;

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        req.body.password=hash

      console.log(req.body.password)

     
    
       next();

        
    });


}


module.exports = {
    encryptPassword
  }