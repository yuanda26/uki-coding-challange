const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Employee Schema
const EmployeeSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

module.exports = Employee = mongoose.model(
  "employee",
  EmployeeSchema,
  "employee"
);
