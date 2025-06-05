package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
        }

        @GetMapping("/{id}")
        public ResponseEntity<User> getUserById(@PathVariable Long id) {
            return ResponseEntity.ok(userService.getUserById(id));
        }

        @PostMapping
        public ResponseEntity<User> createUser(@RequestBody User user) {
            return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
        }

        @PutMapping("/{id}")
        public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
            User user = userService.getUserById(id);

            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            if (userDetails.getPassword() != null) {
                user.setPassword(userDetails.getPassword());
                }

                return ResponseEntity.ok(userService.saveUser(user));
            }

            @DeleteMapping("/{id}")
            public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
                userService.deleteUser(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            @GetMapping("/search")
            public ResponseEntity<Page<User>> searchUsersByName(
                @RequestParam(defaultValue = "") String name,
                @PageableDefault(size = 10) Pageable pageable) {
                    return ResponseEntity.ok(userService.findUsersByName(name, pageable));
                    }

                    @GetMapping("/paginated")
                    public ResponseEntity<Page<User>> getAllUsersPaginated(@PageableDefault(size = 10) Pageable pageable) {
                        return ResponseEntity.ok(userService.getAllUsersPaginated(pageable));
                    }
                    }