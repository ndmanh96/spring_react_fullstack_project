package com.manhcode.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manhcode.entity.Backlog;

public interface BacklogRepository extends JpaRepository<Backlog, Long> {
	public Backlog findByProjectIdentifier(String identifier);
}
