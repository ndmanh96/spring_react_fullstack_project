package com.manhcode.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
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
import com.manhcode.services.MapValidationErrorService;
import com.manhcode.services.ProjectService;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin
public class ProjectController {

	@Autowired
	private ProjectService projectService;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@PostMapping("")
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			 return errorMap;
		Project returnProject = projectService.saveOrUpdateProject(project, principal.getName());
		return new ResponseEntity<Project>(returnProject, HttpStatus.CREATED);
	}
	
	@GetMapping("/{identifier}")
	public ResponseEntity<?> findByIdentifier(@PathVariable String identifier, Principal pricipal) {
		System.out.println(identifier);
		Project responseProject = projectService.findByProjectIdentifier(identifier, pricipal.getName());
		System.out.println(responseProject);
		return new ResponseEntity<Project>(responseProject, HttpStatus.OK);
	}

	@GetMapping("")
	public ResponseEntity<?> findAll(Principal pricipal) {
		List<Project> projects = projectService.findAll(pricipal.getName());
		return new ResponseEntity<List<Project>>(projects, HttpStatus.OK);
	}
	
	@DeleteMapping("/{identifier}")
	public ResponseEntity<?> deleteByIdentifier(@PathVariable String identifier, Principal principal) {
		Project responseProject = projectService.deleteProjectById(identifier, principal.getName());
		return new ResponseEntity<String>("Project id "+identifier+" was deleted", HttpStatus.OK);
	}
	
	@PutMapping("")
	public ResponseEntity<?> updateProject(@Valid @RequestBody Project project, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		Project returnProject = projectService.saveOrUpdateProject(project, principal.getName());
		return new ResponseEntity<Project>(returnProject, HttpStatus.OK);
	}
}
