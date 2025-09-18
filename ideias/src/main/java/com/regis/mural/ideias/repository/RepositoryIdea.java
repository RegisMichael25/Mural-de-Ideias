package com.regis.mural.ideias.repository;


import com.regis.mural.ideias.model.Idea;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Regis Michael
 * @since 2025-09-17
 */

public interface RepositoryIdea extends JpaRepository<Idea, Long> {}
