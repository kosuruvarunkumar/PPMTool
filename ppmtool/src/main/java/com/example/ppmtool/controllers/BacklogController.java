/**
 * Created by varun on 07/11/20
 */

package com.example.ppmtool.controllers;

import com.example.ppmtool.domain.ProjectTask;
import com.example.ppmtool.services.ObjectErrorValidationService;
import com.example.ppmtool.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {
    @Autowired
    private ProjectTaskService projectTaskService;
    @Autowired
    private ObjectErrorValidationService objectErrorValidationService;

    @PostMapping("/{backlogID}")
    public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult result, @PathVariable String backlogID) {
        ResponseEntity<?> errorMap = objectErrorValidationService.objectErrorValidationService(result);
        if(errorMap != null) {
            return errorMap;
        }
        ProjectTask projectTask1 = projectTaskService.addProjectTask(backlogID, projectTask);

        return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.CREATED);
    }

    @GetMapping("/{backlogID}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlogID) {
        return projectTaskService.findBacklogById(backlogID);
    }

    @GetMapping("/{backlogID}/{ptSequence}")
    public ResponseEntity<?> getProjectTask(@PathVariable String backlogID, @PathVariable String ptSequence) {
        ProjectTask projectTask = projectTaskService.findProjectTask(backlogID, ptSequence);
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{backlogID}/{ptSequence}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult bindingResult, @PathVariable String backlogID, @PathVariable String ptSequence) {
        ProjectTask updatedTask = projectTaskService.updateProjectTask(projectTask, backlogID, ptSequence);
        return new ResponseEntity<ProjectTask>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("{backlogID}/{ptSequence}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String backlogID, @PathVariable String ptSequence){
        projectTaskService.deleteProjectTask(backlogID, ptSequence);
        return new ResponseEntity<String>("Project Task deleted successfully", HttpStatus.OK);
    }
}
