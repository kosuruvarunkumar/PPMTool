/**
 * Created by varun on 31/08/20
 */

package com.example.ppmtool.services;

import com.example.ppmtool.domain.Project;
import com.example.ppmtool.exceptions.ProjectIdException;
import com.example.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        }catch (Exception exception) {
            throw new ProjectIdException("Project ID: '"+ project.getProjectIdentifier().toUpperCase()+"' already exists.");
        }
    }

    public Project findProjectByIdentifier(String projectIdentifier) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if(project == null) {
            throw new ProjectIdException("Project ID: '"+ projectIdentifier.toUpperCase()+"' does not exists.");
        }
        return project;
    }
}