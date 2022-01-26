package com.manhcode.security;

public class JWTLoginSuccessResponse {
	private boolean success;
	private String token;
	
	
	public JWTLoginSuccessResponse() {
		
		
	}


	public boolean isSuccess() {
		return success;
	}


	public void setSuccess(boolean success) {
		this.success = success;
	}


	public String getToken() {
		return token;
	}


	public void setToken(String token) {
		this.token = token;
	}


	public JWTLoginSuccessResponse(boolean success, String token) {
		this.success = success;
		this.token = token;
	}
	
	
}
