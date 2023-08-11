package tech.obss.pokedex.auth.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tech.obss.pokedex.auth.exception.InvalidAuthenticationException;
import tech.obss.pokedex.auth.exception.InvalidRegisterRequestException;
import tech.obss.pokedex.auth.model.AuthDetails;
import tech.obss.pokedex.auth.model.Role;
import tech.obss.pokedex.auth.model.dto.AuthRequest;
import tech.obss.pokedex.auth.model.dto.AuthResponse;
import tech.obss.pokedex.model.Token;
import tech.obss.pokedex.model.User;
import tech.obss.pokedex.auth.model.dto.RegisterRequest;
import tech.obss.pokedex.model.mapper.UserMapper;
import tech.obss.pokedex.repository.TokenRepository;
import tech.obss.pokedex.repository.UserRepository;

import java.util.*;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JwtUtilService jwtUtilService;
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        User trainer = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.TRAINER)
                .isEnabled(true)
                .build();

        try {
            User user = userRepository.save(trainer);
            AuthDetails authDetails = new AuthDetails(user);
            HashMap<String, Object> user_info = new HashMap<>();
            user_info.put("user", UserMapper.toDTO(authDetails.getUser()));
            String access_token = jwtUtilService.generateToken(authDetails, user_info);
            String refresh_token = jwtUtilService.generateRefreshToken(authDetails);
            saveToken(authDetails, access_token);
            return AuthResponse.builder()
                    .access_token(access_token)
                    .refresh_token(refresh_token)
                    .build();
        } catch (IllegalArgumentException e) {
            throw new InvalidRegisterRequestException("Bad Register Request!");
        } catch (DataIntegrityViolationException e) {
            throw new InvalidRegisterRequestException("User already exists!");
        }
    }

    private void saveToken(AuthDetails authDetails, String accessToken) {
        Token token = Token.builder()
                .user(authDetails.getUser())
                .token(accessToken)
                .isExpired(false)
                .isRevoked(false)
                .build();
        tokenRepository.save(token);

    }

    @Transactional
    public AuthResponse authenticate(AuthRequest request) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        );
        try {
            Authentication authentication = authenticationManager.authenticate(token);

            AuthDetails authDetails = (AuthDetails) authentication.getPrincipal();
            HashMap<String, Object> user_info = new HashMap<>();
            user_info.put("user", UserMapper.toDTO(authDetails.getUser()));
            String access_token = jwtUtilService.generateToken(authDetails, user_info);
            String refresh_token = jwtUtilService.generateToken(authDetails);
            revokeUserTokens(authDetails);
            saveToken(authDetails, access_token);

            return AuthResponse.builder()
                    .access_token(access_token)
                    .refresh_token(refresh_token)
                    .build();

        } catch (AccountStatusException ex) {
            throw new InvalidAuthenticationException("User is disabled!");
        } catch (BadCredentialsException ex) {
            throw new InvalidAuthenticationException("Bad credentials!");
        } catch (AuthenticationException ex) {
            throw new InvalidAuthenticationException("Authenticated failed!");
        }

    }

    private void revokeUserTokens(AuthDetails authDetails) {
        List<Token> validTokens = tokenRepository.findAllValidTokensByUser(authDetails.getUser().getId());
        validTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });
        tokenRepository.saveAll(validTokens);

    }

    public AuthResponse refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refresh_token = getCookieValue(request, "refresh_token")
                .orElse(null);

        if (refresh_token != null) {
            String username = jwtUtilService.extractUsername(refresh_token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtUtilService.isTokenValid(refresh_token, userDetails)) {
                HashMap<String, Object> user_info = new HashMap<>();
                user_info.put("user", UserMapper.toDTO(((AuthDetails) userDetails).getUser()));
                String accessToken = jwtUtilService.generateToken(userDetails, user_info);
                revokeUserTokens((AuthDetails) userDetails);
                saveToken((AuthDetails) userDetails, accessToken);

                return AuthResponse.builder()
                        .access_token(accessToken)
                        .refresh_token(refresh_token)
                        .build();
            }

        }
        throw new InvalidAuthenticationException("Invalid Refresh Token!");
    }

    public Optional<String> getCookieValue(HttpServletRequest request, String name) {
        final Cookie[] cookies = request.getCookies();
        if (cookies == null) return Optional.empty();
        return Arrays.stream(cookies)
                .filter(e -> name.equals(e.getName()))
                .findAny().map(Cookie::getValue);
    }
}
