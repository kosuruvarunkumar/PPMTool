/**
 * Created by varun on 08/11/20
 */

package com.example.ppmtool.exceptions;

public class ProjectNotFoundExceptionResponse {
    private String projectNotFound;

    public ProjectNotFoundExceptionResponse(String projectNotFound) {
        this.projectNotFound = projectNotFound;
    }

    public String getProjectNotFound() {
        return projectNotFound;
    }

    public void setProjectNotFound(String projectNotFound) {
        this.projectNotFound = projectNotFound;
    }
}
