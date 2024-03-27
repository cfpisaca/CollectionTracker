package com.example.collectionTracker.controller;

import com.example.collectionTracker.entity.User;
import com.example.collectionTracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users") // Base URL for user-related endpoints
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register") // Endpoint for user registration
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Validate user input (optional)

        // Save user to the database
        userService.createUser(user);

        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }
}
