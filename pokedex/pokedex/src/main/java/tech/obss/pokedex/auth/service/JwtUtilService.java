package tech.obss.pokedex.auth.service;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import tech.obss.pokedex.auth.exception.InvalidAuthenticationException;
import tech.obss.pokedex.model.Token;
import tech.obss.pokedex.repository.TokenRepository;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtUtilService {

    @Value("${application.security.jwt.access-token-expiration}")
    private long JWT_EXPIRATION;
    @Value("${application.security.jwt.refresh-token-expiration}")
    private long REFRESH_TOKEN_EXPIRATION;
    @Value("${application.security.jwt.secret-key}")
    private String SECRET_KEY;

    private final TokenRepository tokenRepository;

    public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String generateToken(UserDetails userDetails) {
        return buildToken(userDetails, new HashMap<>(), JWT_EXPIRATION);
    }

    public String generateToken(UserDetails userDetails, HashMap<String, Object> claims) {
        return buildToken(userDetails, claims, JWT_EXPIRATION);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(userDetails, new HashMap<>(), REFRESH_TOKEN_EXPIRATION);
    }

    public String buildToken(UserDetails userDetails, HashMap<String, Object> claims, Long expiration) {
        Date iat = new Date(System.currentTimeMillis());
        Date exp = new Date(System.currentTimeMillis() + expiration);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(iat)
                .setExpiration(exp)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean isTokenValid(String token, UserDetails user) {
        Token token_res = tokenRepository.findByToken(token).orElseThrow();
        return !isTokenExpired(token) && !token_res.isExpired() && !token_res.isRevoked() && user.getUsername().equals(extractUsername(token));
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
