package com.examly.springapp.service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final String defaultAdminEmail = "admin@example.com";
    private final String defaultAdminPassword = "admin123";

    @PostConstruct
    public void createDefaultAdmin() {
        if (!userRepository.existsByEmail(defaultAdminEmail)) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail(defaultAdminEmail);
            admin.setPassword(defaultAdminPassword);
            admin.setRole("ADMIN");
            userRepository.save(admin);
        }
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User findByEmailAndRole(String email, String role) {
        return userRepository.findByEmailAndRole(email, role).orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findByRole("USER");
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
