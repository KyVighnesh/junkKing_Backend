
const mongoose = require("mongoose")



const connect = (URL) => {

    return mongoose.connect(URL)
}


module.exports = connect