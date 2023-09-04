const mongoose = require("mongoose")
const {Schema} = mongoose;


const menuSchema = new Schema({
    id:{
        type:String
    },
    img:{
        type:String
    },
    name:{
        type:String
    },
    dsc:{
        type:String
    },
    price:{
        type:Number
    },
    rate:{
        type:Number
    },
    country:{
        type:String
    }
})


const Menu = mongoose.model('Menu',menuSchema);


module.exports = Menu;