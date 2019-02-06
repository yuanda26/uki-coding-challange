import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class EmployeeEdit extends Component {
  state = {
    staff: null,
    id: "",
    name: "",
    department: ""
  };

  componentDidMount() {
    axios({
      url: `http://localhost:3000/api/employees/${this.props.match.params.id}`,
      method: "get"
    })
      .then(res => {
        this.setState({
          staff: res.data,
          id: res.data.id,
          name: res.data.name,
          department: res.data.department
        });
      })
      .catch(err => console.log(err));
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    // get data from the state
    const { id, name, department } = this.state;
    // initiate updated data object
    const updatedData = { id, name, department };

    // update to the database
    axios({
      url: `http://localhost:3000/api/employees/${this.props.match.params.id}`,
      method: "put",
      headers: { "content-type": "application/json" },
      data: updatedData
    })
      .then(res => {
        if (res !== null) {
          this.props.history.push("/employees");
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1 className="display-4 mt-3 mb-4">Edit Employee</h1>
        <Link to="/employees">Back</Link>
        {this.state.staff === null ? (
          <p className="lead">Loading</p>
        ) : (
          <div className="col-md-4 mt-4">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="id">Employee Id</label>
                <input
                  type="text"
                  placeholder="Type Employee Id"
                  className="form-control"
                  name="id"
                  value={this.state.id}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Employee Name</label>
                <input
                  type="text"
                  placeholder="Type Employee Name"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  placeholder="Type Employee Department"
                  className="form-control"
                  name="department"
                  value={this.state.department}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Save"
                  className="btn btn-primary mr-1"
                />
                <button className="btn btn-danger">Delete</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default EmployeeEdit;
