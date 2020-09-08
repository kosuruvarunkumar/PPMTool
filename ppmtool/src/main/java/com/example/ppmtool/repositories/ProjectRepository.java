/**
 * Created by varun on 31/08/20
 */

package com.example.ppmtool.repositories;

import com.example.ppmtool.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
    Project findByProjectIdentifier(String projectIdentifier);

    @Override
    Iterable<Project> findAll();

}
