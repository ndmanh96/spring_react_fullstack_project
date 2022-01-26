package com.manhcode.services;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manhcode.entity.Backlog;
import com.manhcode.entity.Project;
import com.manhcode.entity.User;
import com.manhcode.exception.ProjectIdException;
import com.manhcode.repository.ProjectRepository;
import com.manhcode.repository.UserRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private UserRepository userRepository;

	public Project saveOrUpdateProject(Project project, String username) {
		try {
			
			//user from login
			User user = userRepository.findByUsername(username);
			
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			if (project.getId() != null) {
				Project databaseProject = projectRepository.findById(project.getId()).get();
				if (databaseProject != null) {
					//update
					if (!databaseProject.getProjectLeader().equals(username)) {
						throw new ProjectIdException("Project not found in your account");
					}
					
					project.setCreatedAt(databaseProject.getCreatedAt());
					project.setBacklog(databaseProject.getBacklog());
					project.setProjectLeader(databaseProject.getProjectLeader());
					project.setUser(databaseProject.getUser());
				}
			} else {
				//leader project
				user.addProject(project);
				project.setProjectLeader(user.getUsername());
				
				Backlog backlog = new Backlog();
				project.setBacklog(backlog);
				backlog.setProject(project);
				backlog.setProjectIdentifier(project.getProjectIdentifier());
			}
			return projectRepository.save(project);
		} catch (ProjectIdException e) {
			throw new ProjectIdException("Project not found in your account");
		} 
		
		catch (Exception e) {
			throw new ProjectIdException("project id "+project.getProjectIdentifier()+" is exist");
		}
	}
	
	public Project findByProjectIdentifier(String projectIdentifier, String username) {
		Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
		if (project == null) {
			throw new ProjectIdException("Project id "+ projectIdentifier + " is not exist");
		} else if(!project.getProjectLeader().equals(username)) {
			throw new ProjectIdException("Project not found in your account");
		}
		return project;
	}
	
	public List<Project> findAll(String username) {
		return projectRepository.findByProjectLeader(username);
	}
	
	public Project deleteProjectById(String projectIdentifier, String username) {
		Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
		if (project == null) {
			throw new ProjectIdException("Project id "+ projectIdentifier + " is not exist");
		} else if(!project.getProjectLeader().equals(username)) {
			throw new ProjectIdException("Project not found in your account");
		} 
		projectRepository.delete(project);
		return project;
	}
}
