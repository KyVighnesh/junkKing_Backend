const mongoose = require("mongoose")
const {Schema} = mongoose;


const userSchema = new Schema({
    name:{
        type:String
    },

    password:{
        type:String
    },

    

    email:{
        type:String
    },

    address:{
        type:String
    },

    contact:{
        type:Number
    },

    products:{
        type:[{type:Object}]
    },
    cart:{
        type:[{type:Object}]
    },

    total:Number
})

const User = mongoose.model('User',userSchema);


module.exports = User;



