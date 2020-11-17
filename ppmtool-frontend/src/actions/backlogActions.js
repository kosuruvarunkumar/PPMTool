/** @format */

import axios from "axios";
import { GET_BACKLOG, GET_ERRORS } from "./types";

export const addProjectTask = (backlogID, projectTask, history) => async (
    dispatch
) => {
    try {
        await axios.post(`/api/backlog/${backlogID}`, projectTask);
        history.push(`/projectBoard/${backlogID}`);
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

export const getBacklog = (backlogID) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/backlog/${backlogID}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data,
        });
    } catch (error) {
        console.log("Error observed");
    }
};
