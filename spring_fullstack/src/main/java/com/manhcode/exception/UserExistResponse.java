package com.manhcode.exception;

public class UserExistResponse {
	private String username;

	public UserExistResponse(String username) {
		this.username = username;
	}
	
	public UserExistResponse() {}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
}
