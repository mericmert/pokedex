package tech.obss.pokedex.controller;

import jakarta.servlet.http.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.obss.pokedex.auth.model.dto.AuthRequest;
import tech.obss.pokedex.auth.model.dto.AuthResponse;
import tech.obss.pokedex.auth.model.dto.RegisterRequest;
import tech.obss.pokedex.auth.service.AuthenticationService;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request, HttpServletResponse response) {
        AuthResponse res = authService.authenticate(request);
        Cookie cookie = new Cookie("refresh_token", res.getRefresh_token());
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setSecure(false);
        cookie.setMaxAge(604800);
        response.addCookie(cookie);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/logout-validate")
    public void logout(@RequestParam(value = "status") String status) {
        if (log.isDebugEnabled()) {
            log.debug("Logout status: " + status);
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(HttpServletRequest request, HttpServletResponse response){
        return ResponseEntity.ok(authService.refreshToken(request, response));
    }

}
