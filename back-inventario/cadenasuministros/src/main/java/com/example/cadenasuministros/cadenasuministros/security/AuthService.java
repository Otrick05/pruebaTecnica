package com.example.cadenasuministros.cadenasuministros.security;

import java.time.Duration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.cadenasuministros.cadenasuministros.DTO.request.SignupRequest;
import com.example.cadenasuministros.cadenasuministros.exception.CorreoYaExisteException;
import com.example.cadenasuministros.cadenasuministros.model.Usuario;
import com.example.cadenasuministros.cadenasuministros.repository.RolRepository;
import com.example.cadenasuministros.cadenasuministros.repository.UsuarioRepository;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final RolRepository rolRepository;

    public AuthService(AuthenticationManager authenticationManager, JwtService jwtService,
            UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, RolRepository rolRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.rolRepository = rolRepository;

    }

    public String authenticateAndGenerateToken(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(userDetails);

        String subject = userDetails.getUsername();
        String jti = jwtService.extractJti(token);
        Duration ttl = jwtService.timeToExpiry(token);

        return token;
    }

    public String registerAndAuthenticateUser(SignupRequest signupRequest) {

        if (usuarioRepository.findByCorreo(signupRequest.getCorreo()).isPresent()) {
            throw new CorreoYaExisteException("El Correo ya está en uso");
        }

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombreUsuario(signupRequest.getNombreUsuario());
        nuevoUsuario.setCorreo(signupRequest.getCorreo());
        nuevoUsuario.setPassword(passwordEncoder.encode(signupRequest.getPassword()));

        rolRepository.findByNombre("ALMACENISTA")
                .ifPresent(nuevoUsuario::setRol);

        usuarioRepository.save(nuevoUsuario);

        return authenticateAndGenerateToken(
                nuevoUsuario.getCorreo(),
                signupRequest.getPassword());
    }

}
