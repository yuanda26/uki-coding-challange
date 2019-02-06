const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// Include Database Model
const Employee = require("./models/Employee");

// initialize express server
const server = express();
// Initialize Morgan
server.use(morgan("dev"));
// Body Parser Middleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
// Enable All CORS Requests
server.use(cors());

// DB Config
const db = require("./config/database").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("[Database] MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
// @route   GET api/employees
// @desc    Get All Employees
server.get("/api/employees", (req, res) => {
  Employee.find()
    .sort({ id: 1 })
    .then(employee => res.json(employee))
    .catch(err => res.status(404).json({ noemployee: "No Employee Found" }));
});

// @route   POST api/employees
// @desc    Create New Employee
server.post("/api/employees", (req, res) => {
  const newEmployee = new Employee({
    id: req.body.id,
    name: req.body.name,
    department: req.body.department
  });

  newEmployee
    .save()
    .then(emloyee => res.json(emloyee))
    .catch(err => res.status(501).send(err));
});

// @route   GET api/employees
// @desc    Get Employee By Id
server.get("/api/employees/:id", (req, res) => {
  Employee.findOne({ id: req.params.id })
    .then(employee => {
      if (employee !== null) {
        res.json(employee);
      } else {
        res
          .status(404)
          .json({ noemployee: `No Employee Found with Id ${req.params.id}` });
      }
    })
    .catch(err => res.status(404).json(err));
});

// @route   PUT api/employees
// @desc    Update Employee Data
server.put("/api/employees/:id", (req, res) => {
  Employee.findOne({ id: req.params.id })
    .then(employee => {
      if (employee !== null) {
        // Set Updated Data Object
        const updatedEmployee = {
          id: req.body.id ? req.body.id : employee.id,
          name: req.body.name ? req.body.name : employee.name,
          department: req.body.department
            ? req.body.department
            : employee.department
        };

        // Update Employee Data
        Employee.findOneAndUpdate(
          { id: req.params.id },
          { $set: updatedEmployee },
          { new: true }
        )
          .then(employee => res.json(employee))
          .catch(err => res.status(501).json(err));
      } else {
        res
          .status(404)
          .json({ noemployee: `No Employee Found with Id ${req.params.id}` });
      }
    })
    .catch(err => res.status(404).json(err));
});

const port = process.env.PORT || 3000;
server.listen(port, () =>
  console.log(`[Server] Running on Port http://localhost:${port}/`)
);
