/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";

class AddProject extends Component {
    constructor() {
        super();
        this.state = {
            projectName: "",
            projectIdentifier: "",
            projectDescription: "",
            startDate: "",
            endDate: "",
            errors: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
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
        this.props.createProject(newProject, this.props.history);
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="project">
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
                                        className={classnames(
                                            "form-control form-control-lg ",
                                            {
                                                "is-invalid":
                                                    errors.projectName,
                                            }
                                        )}
                                        placeholder="Project Name"
                                        name="projectName"
                                        value={this.state.projectName}
                                        onChange={this.handleChange}
                                    />
                                    {errors.projectName && (
                                        <div className="invalid-feedback">
                                            {errors.projectName}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames(
                                            "form-control form-control-lg",
                                            {
                                                "is-invalid":
                                                    errors.projectIdentifier,
                                            }
                                        )}
                                        placeholder="Unique Project ID"
                                        name="projectIdentifier"
                                        value={this.state.projectIdentifier}
                                        onChange={this.handleChange}
                                    />
                                    {errors.projectIdentifier && (
                                        <div className="invalid-feedback">
                                            {errors.projectIdentifier}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className={classnames(
                                            "form-control form-control-lg",
                                            {
                                                "is-invalid":
                                                    errors.projectDescription,
                                            }
                                        )}
                                        placeholder="Project Description"
                                        name="projectDescription"
                                        value={this.state.projectDescription}
                                        onChange={this.handleChange}
                                    ></textarea>
                                    {errors.projectDescription && (
                                        <div className="invalid-feedback">
                                            {errors.projectDescription}
                                        </div>
                                    )}
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

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStatetoErrors = (state) => ({
    errors: state.errors,
});
export default connect(mapStatetoErrors, { createProject })(AddProject);
