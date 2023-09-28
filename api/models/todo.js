const mongoose = require("mongoose");
const schema = mongoose.Schema;
const todoschema = new schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const todo = mongoose.model("todo", todoschema);
module.exports = todo;
