package com.lakshman.Billing_Software.Util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String,Object> claims, String subject) {
        return JWT.create()
                .withIssuer("auth0")
                .withSubject(subject)
                .withPayload(claims)
                .withExpiresAt(new Date(System.currentTimeMillis()+1000*60*60*10))
                .sign(Algorithm.HMAC256(SECRET_KEY));
    }

    public String extractUsername(String token) {
        return JWT.decode(token).getSubject();
    }

    public Date extractExpiration(String token) {
        return JWT.decode(token).getExpiresAt();
    }

    public <T> T extractClaims(String token, Function<Claim, T> claimsResolver){
        final Claim claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claim extractAllClaims(String token) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);

        JWTVerifier verifier = JWT.require(algorithm)
                .build();

        DecodedJWT jwt = verifier.verify(token);

        return (Claim) jwt.getClaims();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final  String userName = extractUsername(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
