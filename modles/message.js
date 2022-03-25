const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    msg:{
        type:String
    }
})


const Msg = mongoose.model("msg",messageSchema)


module.exports={
    Msg
}