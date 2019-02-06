import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Employee extends Component {
  state = {
    employees: null,
    staff: null
  };

  componentDidMount() {
    axios({
      url: "http://localhost:3000/api/employees",
      method: "get"
    })
      .then(res => {
        this.setState({
          employees: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="employee">
        <h1 className="display-4 mt-3 mb-4">Employee List</h1>
        <Link to="create-employee">
          <button className="btn btn-primary text-white">+ New Employee</button>
        </Link>
        <div className="employee-list mt-4">
          <div className="table-responsive">
            <table className="table table-stripped">
              <thead>
                <tr className="text-center font-weight-bold">
                  <td>Employee ID</td>
                  <td>Employee Name</td>
                  <td>Department</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {this.state.employees === null ? (
                  <tr>
                    <td colSpan="4">Loading</td>
                  </tr>
                ) : (
                  this.state.employees.map(staff => (
                    <tr className="text-center" key={staff._id}>
                      <td>{staff.id}</td>
                      <td>{staff.name}</td>
                      <td>{staff.department}</td>
                      <td>
                        <Link to={`employees/${staff.id}`}>[Edit]</Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Employee;
