package com.manhcode.controller;

import java.security.Principal;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manhcode.entity.Project;
import com.manhcode.entity.ProjectTask;
import com.manhcode.services.MapValidationErrorService;
import com.manhcode.services.ProjectService;
import com.manhcode.services.ProjectTaskService;

import jdk.internal.org.jline.utils.ShutdownHooks.Task;

@RestController
@RequestMapping("/api/backlogs")
@CrossOrigin
public class BacklogController {
	@Autowired
	private ProjectTaskService taskService;
	
	@Autowired
	private MapValidationErrorService errorService;
	
	@PostMapping("/{backlog_id}")
	public ResponseEntity<?> saveTask(@PathVariable String backlog_id, @RequestBody ProjectTask task, BindingResult result, Principal principal) {
		
	
		ResponseEntity<?> errorMap = errorService.MapValidationService(result);
		if (errorMap != null) return errorMap;
		
		ProjectTask returnTask = taskService.addProjectTask(backlog_id, task, principal.getName());
		
		return new ResponseEntity<ProjectTask>(returnTask, HttpStatus.CREATED);
	}
	
	@GetMapping("/{backlog_id}")
	public ResponseEntity<?> getTaskByIdentifier(@PathVariable String backlog_id, Principal principal) {
		List<ProjectTask> tasks = taskService.findByIdentifier(backlog_id, principal.getName());
		return new ResponseEntity<List<ProjectTask>>(tasks, HttpStatus.OK);
	}
	
	@GetMapping("/{backlog_id}/{sequence}")
	public ResponseEntity<?> getTaskBySequence(@PathVariable String backlog_id, @PathVariable String sequence, Principal principal) {
		ProjectTask task = taskService.findBySequence(backlog_id, sequence, principal.getName());
		return new ResponseEntity<ProjectTask>(task, HttpStatus.OK);
	}
	
	@PatchMapping("/{backlog_id}/{sequence}")
	public ResponseEntity<?> updateTaskBySequence(@PathVariable String backlog_id, @PathVariable String sequence,
							@Valid @RequestBody ProjectTask task, BindingResult result, Principal principal) {
		ResponseEntity<?> errorMap = errorService.MapValidationService(result);
		if (errorMap != null) return errorMap;
		
		ProjectTask updateTask = taskService.updateTaskBySequence(backlog_id, sequence, task, principal.getName());
		return new ResponseEntity<ProjectTask>(updateTask, HttpStatus.OK);
	}
	
	@DeleteMapping("/{backlog_id}/{sequence}")
	public ResponseEntity<?> deleteTaskBySequence(@PathVariable String backlog_id, @PathVariable String sequence, Principal principal) {
		taskService.deleteTaskBySequence(backlog_id, sequence, principal.getName());
		return new ResponseEntity<String>("Project task "+sequence+" was deleted successfully!", HttpStatus.OK);
	}
}
