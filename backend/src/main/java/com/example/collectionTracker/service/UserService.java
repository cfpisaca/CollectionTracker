package com.example.collectionTracker.service;

import com.example.collectionTracker.entity.User;
import com.example.collectionTracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.Collections;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Create operation
    @SuppressWarnings("null")
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Read operation
    public List<User> getAllUsers() {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            // Log the exception or handle it in some other way
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    // Update operation
    @SuppressWarnings("null")
    public User updateUser(User user) {
        Long userId = user.getId();
        Optional<User> existingUser = userRepository.findById(userId);
        if (existingUser.isPresent()) {
            return userRepository.save(user);
        } else {
            // Handle case where user with specifiec ID doesn't exist
            throw new IllegalArgumentException("User with ID " + userId + " not found");
        }
    }

    // Delete operation
    @SuppressWarnings("null")
    public void deleteUser(Long userId) {
        Optional<User> existingUser = userRepository.findById(userId);
        if (existingUser.isPresent()) {
            userRepository.deleteById(userId);
        } else {
            throw new IllegalArgumentException("User with ID " + userId + " not found");
        }
    }

    // Get user by ID
    @SuppressWarnings("null")
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }
}
