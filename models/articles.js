var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticlesSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: {unique:true},
    },
    summary: {
        type: String
    },
    link: {
        type:String
    },
    notes: {
        type: Schema.Types.ObjectId,
        ref: "Notes"
    }
});

// Creates Model using the Schema above
var Articles = mongoose.model("Articles", ArticlesSchema);

module.exports = Articles;