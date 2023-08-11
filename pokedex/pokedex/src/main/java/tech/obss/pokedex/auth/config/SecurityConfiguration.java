package tech.obss.pokedex.auth.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import tech.obss.pokedex.auth.service.LogoutService;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private static final String LOGOUT_URL = "/api/v1/auth/logout";
    private static final String LOGOUT_SUCCESS_URL = "/api/v1/auth/logout-validate?status=success";

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final LogoutService logoutHandler;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(customizer -> customizer
                        .configurationSource(request -> {
                            CorsConfiguration config = new CorsConfiguration();
                            config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                            config.setAllowedMethods(Collections.singletonList("*"));
                            config.setAllowedHeaders(Collections.singletonList("*"));
                            config.setAllowCredentials(true);
                            config.setMaxAge(3600L);
                            return config;
                        }))
                .authorizeHttpRequests(customizer -> customizer
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/pokemons/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/trainers/**").hasAnyRole("ADMIN","TRAINER")
                        .requestMatchers(HttpMethod.POST,"/api/v1/pokemons/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/api/v1/pokemons/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/v1/types/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/api/v1/types/**").hasRole("ADMIN")
                        .requestMatchers("/api/v1/users/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .sessionManagement(customizer -> customizer
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .exceptionHandling(customizer -> customizer
                        .authenticationEntryPoint((request, response, e) -> {
                            response.setStatus(HttpStatus.UNAUTHORIZED.value());
                            response.setContentType("application/json");
                            response.getWriter().write("{ \"error\": \"You are not authenticated.\" }");
                        })
                )
                .logout(customizer -> customizer
                        .addLogoutHandler(logoutHandler)
                        .logoutUrl(LOGOUT_URL)
                        .logoutSuccessUrl(LOGOUT_SUCCESS_URL)
                        .logoutSuccessHandler((request, response, authentication) -> {
                            SecurityContextHolder.clearContext();
                        })
                );
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
