package com.manhcode.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manhcode.entity.Backlog;
import com.manhcode.entity.Project;
import com.manhcode.entity.ProjectTask;
import com.manhcode.exception.ProjectIdException;
import com.manhcode.exception.ProjectNotFoundException;
import com.manhcode.repository.BacklogRepository;
import com.manhcode.repository.ProjectRepository;
import com.manhcode.repository.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private BacklogRepository backlogRepository;

	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private ProjectService projectService;

	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask task, String username) {
		try {
			Backlog backlog = projectService.findByProjectIdentifier(projectIdentifier, username).getBacklog();
			System.out.println(backlog.getProjectIdentifier());
			backlog.addProjectTask(task);
			Integer backlogSequence = backlog.getPTSequence();
			backlogSequence++;
			backlog.setPTSequence(backlogSequence);

			task.setProjectSequence(projectIdentifier + "-" + backlogSequence);
			task.setProjectIdentifer(projectIdentifier);

			if (task.getPriority()==0 || task.getPriority() == null) {
				task.setPriority(3);
			}
			
			if(task.getStatus() == "" || task.getStatus()==null) {
				task.setStatus("TO_DO");
			}

			return projectTaskRepository.save(task);
		}  catch (ProjectIdException e) {
			throw new ProjectIdException("Project not found in your account");
		} catch (Exception e) {
			throw new ProjectNotFoundException("project with identifier "+projectIdentifier+" not found");
		}
	}
	
	public List<ProjectTask> findByIdentifier(String identifier, String username) {
		Project project = projectService.findByProjectIdentifier(identifier, username);
		if(project==null) {
			throw new ProjectNotFoundException("project identifier: "+identifier+" not found");
		}
		return projectTaskRepository.findByProjectIdentiferOrderByPriority(identifier);
	}
	
	public ProjectTask findBySequence(String identifier, String sequence, String username) {
		Backlog backlog = projectService.findByProjectIdentifier(identifier, username).getBacklog();
		
		if(backlog==null) {
			throw new ProjectNotFoundException("project identifier: "+identifier+" not found");
		}
		
		ProjectTask task = projectTaskRepository.findByProjectSequence(sequence);
		
		if (task == null) {
			throw new ProjectNotFoundException("project task sequence: "+sequence+" not found");
		}
		
		if(!task.getBacklog().getProjectIdentifier().equals(identifier)) {// backlog is not include task
			throw new ProjectNotFoundException("project task sequence: "+sequence+" is not include in project identifier: "+ identifier);
		}
		
		return task;
	}
	
	public ProjectTask updateTaskBySequence(String identifier,String sequence, ProjectTask task, String username) {
		ProjectTask projectTask = findBySequence(identifier, sequence, username);
		if (projectTask!=null) {
			task.setCreate_At(projectTask.getCreate_At());
		}
		return projectTaskRepository.save(task);
		
	}
	
	public void deleteTaskBySequence(String identifier,String sequence, String username) {
		ProjectTask projectTask = findBySequence(identifier, sequence, username);
		if (projectTask!=null) {
			projectTaskRepository.delete(projectTask);
		}
	}
}
