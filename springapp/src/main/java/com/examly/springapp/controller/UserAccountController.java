package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
public class UserAccountController {

    @Autowired
    private UserService userService;

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOwnAccount(@PathVariable Long id, @RequestBody User userDetails) {
        return userService.findById(id).map(user -> {
            if (!user.getRole().equals("USER")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Cannot update this user");
            }
            user.setName(userDetails.getName());
            user.setPassword(userDetails.getPassword());
            return ResponseEntity.ok(userService.saveUser(user));
        }).orElse(ResponseEntity.notFound().build());
    }
}
