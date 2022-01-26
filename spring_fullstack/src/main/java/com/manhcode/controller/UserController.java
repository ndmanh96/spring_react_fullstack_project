package com.manhcode.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manhcode.entity.User;
import com.manhcode.security.JWTLoginSuccessResponse;
import com.manhcode.security.JwtTokenProvider;
import com.manhcode.security.LoginRequest;
import com.manhcode.security.SecurityConstants;
import com.manhcode.services.MapValidationErrorService;
import com.manhcode.services.UserService;
import com.manhcode.validator.UserValidator;

import ch.qos.logback.core.pattern.util.RegularEscapeUtil;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	//validator User
	@Autowired
	private UserValidator userValidator;
	
	
	//jwt
	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@PostMapping
	public ResponseEntity<?> saveUser(@Valid @RequestBody User user, BindingResult result) {
		userValidator.validate(user, result);
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			 return errorMap;
		
		User userResponse = userService.saveUser(user);
		return new ResponseEntity<User>(userResponse, HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			 return errorMap;
		
		//Authentication
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
				);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = SecurityConstants.TOKEN_PREFIX + tokenProvider.generateToken(authentication);
		
		return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
				
		
	}
}
