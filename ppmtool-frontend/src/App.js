/** @format */

import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Header from "./Components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./Components/Project/UpdateProject";
import AddProject from "./Components/Project/AddProject";
import ProjectBoard from "./Components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./Components/ProjectBoard/ProjectTask/AddProjectTask";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Header />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/addProject" component={AddProject} />
                    <Route
                        exact
                        path="/updateProject/:projectIdentifier"
                        component={UpdateProject}
                    />
                    <Route
                        exact
                        path="/projectBoard/:projectIdentifier"
                        component={ProjectBoard}
                    />
                    <Route
                        exact
                        path="/addProjectTask/:projectIdentifier"
                        component={AddProjectTask}
                    />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
