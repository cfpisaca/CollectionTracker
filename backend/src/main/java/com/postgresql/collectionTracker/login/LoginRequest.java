package com.postgresql.collectionTracker.login;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
