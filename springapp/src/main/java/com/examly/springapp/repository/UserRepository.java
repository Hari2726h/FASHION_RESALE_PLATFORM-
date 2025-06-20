package com.examly.springapp.repository;

import com.examly.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndRole(String email, String role);
    List<User> findByRole(String role); // Get all users (not admin)
}
