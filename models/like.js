const {Schema, models, model} = require("mongoose");

const likeSchema = new Schema({
    user:{
        type: String,
        required: true
    },
    post:{
        type: String,
        required: true
    }
    },{
    timestamps: true
})

likeSchema.index({user: 1, post: 1}, {unique: true})

export default models.likes || model("likes", likeSchema)