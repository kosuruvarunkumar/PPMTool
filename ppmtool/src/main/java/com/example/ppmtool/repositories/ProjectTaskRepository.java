/**
 * Created by varun on 07/11/20
 */

package com.example.ppmtool.repositories;

import com.example.ppmtool.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {
    public Iterable<ProjectTask> findByProjectIdentifierOrderByPriority(String backlogID);

    public ProjectTask findByProjectTaskSequence(String projectTaskSequence);
}
