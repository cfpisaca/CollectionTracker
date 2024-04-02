package com.example.collectionTracker.service;

import com.example.collectionTracker.entity.User;
import com.example.collectionTracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

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
        return userRepository.findAll();
    }

    // Update operation
    @SuppressWarnings("null")
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    // Delete operation
    @SuppressWarnings("null")
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    // Get user by ID
    @SuppressWarnings("null")
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }
}
