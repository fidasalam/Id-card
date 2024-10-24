const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const templateSchema = new Schema(
  {
    templateName: {
      type: String,
      required: true, 
    },
    templateHTML: {
      type: String, 
      required: true,
    },
    bgImage: {
      type: String, 
    },
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
