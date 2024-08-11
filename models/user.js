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
    },
    admin:{
        type: Boolean,
        required: true,
        default: false
    }
    },{
    timestamps: true
})

export default models.users || model("users", userSchema)