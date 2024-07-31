const {Schema, models, model} = require("mongoose");

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

export default models.users || model("users", userSchema)