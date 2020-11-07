/** @format */

import axios from "axios";
import {
    GET_ERRORS,
    GET_PROJECTS,
    GET_PROJECT,
    DELETE_PROJECT,
} from "../actions/types";

export const createProject = (project, history) => async (dispatch) => {
    try {
        const res = await axios.post("api/project", project);
        history.push("/dashboard");
        dispatch({
            type: GET_ERRORS,
            payload: {},
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data,
        });
    }
};

export const getProjects = () => async (dispatch) => {
    const res = await axios.get("api/project/");
    dispatch({
        type: GET_PROJECTS,
        payload: res.data,
    });
};

export const getProjectById = (projectIdentifier, history) => async (
    dispatch
) => {
    try {
        const res = await axios.get(`api/project/${projectIdentifier}`);
        dispatch({
            type: GET_PROJECT,
            payload: res.data,
        });
    } catch (error) {
        history.push("/dashboard");
    }
};

export const deleteProjectById = (projectIdentifier) => async (dispatch) => {
    if (window.confirm("Are you sure? This action is irreversible.")) {
        await axios.delete(`api/project/${projectIdentifier}`);
        dispatch({
            type: DELETE_PROJECT,
            payload: projectIdentifier,
        });
    }
};
