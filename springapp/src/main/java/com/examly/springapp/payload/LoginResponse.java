package com.examly.springapp.payload;

public class LoginResponse {
    private Long userId;
    private String email;
    private String token;

    public LoginResponse(Long userId, String email, String token) {
        this.userId = userId;
        this.email = email;
        this.token = token;
    }

    // Getters only
    public Long getUserId() { return userId; }
    public String getEmail() { return email; }
    public String getToken() { return token; }
}
