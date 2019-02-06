import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import Components
import EmployeeList from "./components/EmployeeList";
import EmployeeAdd from "./components/EmployeeAdd";
import EmployeeEdit from "./components/EmployeeEdit";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Router>
            <Switch>
              <Route exact path="/" component={EmployeeList} />
              <Route exact path="/employees" component={EmployeeList} />
              <Route exact path="/create-employee" component={EmployeeAdd} />
              <Route exact path="/employees/:id" component={EmployeeEdit} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
