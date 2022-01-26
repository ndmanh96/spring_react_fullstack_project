package com.manhcode.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.manhcode.entity.User;
import com.manhcode.exception.UserExistException;
import com.manhcode.repository.UserRepository;
import com.manhcode.validator.UserValidator;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	

	public User saveUser (User user) {
		try {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			
			return userRepository.save(user);
		} catch (Exception e) {
			throw new UserExistException("Username: "+user.getUsername()+ " already exist!");
		}
	}
}
