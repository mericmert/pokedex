package tech.obss.pokedex.auth.config;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tech.obss.pokedex.auth.exception.InvalidAuthenticationException;
import tech.obss.pokedex.auth.service.JwtUtilService;
import tech.obss.pokedex.model.Token;
import tech.obss.pokedex.repository.TokenRepository;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtilService jwtUtilService;
    private final UserDetailsService userDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getServletPath().contains("api/v1/auth")) {
            filterChain.doFilter(request, response);
            return;
        }
        String jwt = parseJwt(request);
        if (jwt != null){
            try{
                String username = jwtUtilService.extractUsername(jwt);
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null){
                    UserDetails authDetails = userDetailsService.loadUserByUsername(username);
                    if (jwtUtilService.isTokenValid(jwt, authDetails) && authDetails.isEnabled()){
                        UsernamePasswordAuthenticationToken auth_token = new UsernamePasswordAuthenticationToken(
                                authDetails,
                                null,
                                authDetails.getAuthorities()
                        );
                        auth_token.setDetails(
                                new WebAuthenticationDetailsSource().buildDetails(request)
                        );
                        SecurityContextHolder.getContext().setAuthentication(auth_token);
                    } else{
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    }
                }
            } catch (ExpiredJwtException ex){
                response.setHeader("x-token-expired", "true");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        }
        filterChain.doFilter(request,response);
    }

    private String parseJwt(HttpServletRequest request) {

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header != null && header.startsWith("Bearer")){
            return header.substring(7);
        }
        return null;
    }
}
