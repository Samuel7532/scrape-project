var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String
    }

});

// Creates Model using the Schema above
var Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;