const {Schema, models, model} = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const postSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    note:{
        type: String,
        required: false,
        default: null
    },
    likes:{
        type: Number,
        required: false,
        default: 0
    }
    },{
    timestamps: true
})

postSchema.plugin(mongoosePaginate);

export default models.post || model("post", postSchema)