package com.manhcode.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manhcode.entity.ProjectTask;

public interface ProjectTaskRepository extends JpaRepository<ProjectTask, Long> {
	public List<ProjectTask> findByProjectIdentiferOrderByPriority(String projectIdentifier);
	public ProjectTask findByProjectSequence(String sequence);
}
