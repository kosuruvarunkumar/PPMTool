import React, { Component } from "react";

class AddProject extends Component {
    constructor() {
        super();
        this.state = {
            projectName: "",
            projectIdentifier: "",
            projectDescription: "",
            startDate: "",
            endDate: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const newProject = {
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            projectDescription: this.state.projectDescription,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        };
        console.log(newProject);
    }
    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">
                                Create Project form
                            </h5>
                            <hr />
                            <form method="POST" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg "
                                        placeholder="Project Name"
                                        name="projectName"
                                        value={this.state.projectName}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Unique Project ID"
                                        name="projectIdentifier"
                                        value={this.state.projectIdentifier}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        placeholder="Project Description"
                                        name="projectDescription"
                                        value={this.state.projectDescription}
                                        onChange={this.handleChange}
                                    ></textarea>
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="startDate"
                                        value={this.state.startDate}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="endDate"
                                        value={this.state.endDate}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProject;
