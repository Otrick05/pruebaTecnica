package com.example.cadenasuministros.cadenasuministros.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cadenasuministros.cadenasuministros.DTO.request.LoginRequest;
import com.example.cadenasuministros.cadenasuministros.DTO.request.SignupRequest;
import com.example.cadenasuministros.cadenasuministros.security.AuthService;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {

        String token = authService
                .authenticateAndGenerateToken(
                        loginRequest.getCorreo(),
                        loginRequest.getPassword());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> registrarUsuario(@RequestBody SignupRequest SignupRequest) {
        String jwt = authService.registerAndAuthenticateUser(SignupRequest);

        Map<String, String> response = new HashMap<>();
        response.put("token", jwt);
        return ResponseEntity.ok(response);
    }

}
