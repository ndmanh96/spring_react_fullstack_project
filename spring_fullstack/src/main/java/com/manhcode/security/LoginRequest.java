package com.manhcode.security;

import javax.validation.constraints.NotBlank;

import org.springframework.stereotype.Component;

@Component
public class LoginRequest {
	@NotBlank(message = "Username cannot be blank")
	private String username;
	
	@NotBlank(message = "Password cannot be blank")
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public LoginRequest(@NotBlank(message = "Username cannot be blank") String username) {
		this.username = username;
	}
	
	public LoginRequest() {}
	
	
	
	
}
