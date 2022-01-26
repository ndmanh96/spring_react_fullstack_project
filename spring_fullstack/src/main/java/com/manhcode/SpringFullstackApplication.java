package com.manhcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.manhcode")
public class SpringFullstackApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringFullstackApplication.class, args);
	}

}
