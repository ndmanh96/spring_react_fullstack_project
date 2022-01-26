package com.manhcode.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.manhcode.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
	public Project findByProjectIdentifier(String projectIdenfitier);
	
	public Project deleteByProjectIdentifier(String projectIdenfitier);
	
	public List<Project> findByProjectLeader(String username);
}
