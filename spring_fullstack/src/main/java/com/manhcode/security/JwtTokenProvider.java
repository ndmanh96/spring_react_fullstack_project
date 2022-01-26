package com.manhcode.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.manhcode.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtTokenProvider {
	//generate token
	public String generateToken(Authentication authentication) {
		User user = (User) authentication.getPrincipal();
		if (user != null) {
			
			Date now = new Date(System.currentTimeMillis());
			
			Date expirDate = new Date(now.getTime() + SecurityConstants.EXPIRATION_TIME);
			
			String userId = Long.toString(user.getId());
			
			Map<String, Object> claims = new HashMap<>();
			
			claims.put("id", userId);
			claims.put("username", user.getUsername());
			claims.put("fullName", user.getFullName());
			
			return Jwts.builder()
					.setSubject(userId)
					.setClaims(claims)
					.setIssuedAt(now)
					.setExpiration(expirDate)
					.signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET_KEY)
					.compact();
		}
		return null;
		}
	
	//validate jwt token
	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(SecurityConstants.SECRET_KEY).parseClaimsJws(token);
			return true;
			
		}catch (SignatureException e) {
			System.out.println("Invalid JWT Signature");
		}catch (MalformedJwtException e) {
			System.out.println("Invalid JWT Token");
		}catch (ExpiredJwtException e) {
			System.out.println("Expired JWT Token");
		}catch (UnsupportedJwtException e) {
			System.out.println("Unsupport JWT Token");
		}catch (IllegalArgumentException e) {
			System.out.println("JWT claims string is empty");
		}
		return false;
	}
	
	// get user id from token
	public Long getUserIdFromToken(String token) {
		Claims claims = Jwts.parser().setSigningKey(SecurityConstants.SECRET_KEY).parseClaimsJws(token).getBody();
		String id = (String) claims.get("id");
		return Long.parseLong(id);
	}
}
