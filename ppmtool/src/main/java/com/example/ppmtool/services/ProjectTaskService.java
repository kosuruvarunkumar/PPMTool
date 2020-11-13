/**
 * Created by varun on 07/11/20
 */

package com.example.ppmtool.services;

import com.example.ppmtool.domain.Backlog;
import com.example.ppmtool.domain.ProjectTask;
import com.example.ppmtool.exceptions.ProjectNotFoundException;
import com.example.ppmtool.repositories.BacklogRepository;
import com.example.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {
    @Autowired
    private BacklogRepository backlogRepository;
    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    private Backlog getBacklog(String projectIdentifier) {
        return backlogRepository.findByProjectIdentifier(projectIdentifier);
    }

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        try{
            Backlog backlog = getBacklog(projectIdentifier);
            projectTask.setBacklog(backlog);
            Integer backlogSequence;
            backlogSequence = backlog.getPtSequence();
            backlogSequence++;
            backlog.setPtSequence(backlogSequence);
            projectTask.setProjectTaskSequence(projectIdentifier+"-"+backlogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);
            if(projectTask.getPriority() == null || projectTask.getPriority() == 0) {
                projectTask.setPriority(3);
            }

            if(projectTask.getStatus() == "" || projectTask.getStatus() == null) {
                projectTask.setStatus("TO-DO");
            }
            return projectTaskRepository.save(projectTask);
        }catch(Exception exception) {
            throw new ProjectNotFoundException("Project Not Found");
        }
    }

    public Iterable<ProjectTask> findBacklogById(String projectIdentifier) {

        if(getBacklog(projectIdentifier) == null) {
            throw new ProjectNotFoundException("Project with id '"+ projectIdentifier +"' does not exist");
        }

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }

    public ProjectTask findProjectTask(String backlogID, String projectTaskSequence) {
        if(getBacklog(backlogID) == null) {
            throw new ProjectNotFoundException("Project with id '"+backlogID+"' does not exists.");
        }
        ProjectTask projectTask = projectTaskRepository.findByProjectTaskSequence(projectTaskSequence);
        if(projectTask == null) {
            throw new ProjectNotFoundException("Project task with id '"+projectTaskSequence+"' does not exists.");
        }
        if(!projectTask.getProjectIdentifier().equals(backlogID)) {
            throw new ProjectNotFoundException("Project task with id '"+projectTaskSequence+"' does not exists in project with id '"+backlogID+"'.");
        }
        return projectTask;
    }

    public ProjectTask updateProjectTask(ProjectTask updatedProjectTask, String backlogID, String projectTaskSequence) {
        ProjectTask projectTask = findProjectTask(backlogID, projectTaskSequence);
        projectTask = updatedProjectTask;
        return projectTaskRepository.save(projectTask);
    }

    public void deleteProjectTask(String backlogID, String projectIdentifier){
        ProjectTask projectTask = findProjectTask(backlogID, projectIdentifier);
        projectTaskRepository.delete(projectTask);
    }
}
