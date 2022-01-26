package com.manhcode.security;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.manhcode.entity.User;
import com.manhcode.security.CustomeUserDetailsService;
import com.manhcode.security.JwtTokenProvider;
import com.manhcode.security.SecurityConstants;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JWTTokenValidatorFilter extends OncePerRequestFilter {
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
		String jwt = getJwtFromRequest(request);
		if (StringUtils.hasText(jwt) && validateToken(jwt)) {
			String username = getUsernameFromToken(jwt);

			Authentication auth = new UsernamePasswordAuthenticationToken(username,null,
					Collections.emptyList());
			SecurityContextHolder.getContext().setAuthentication(auth);
		}
		} catch (Exception e) {
			System.out.println("Can't valid user with token");
		}
		filterChain.doFilter(request, response);
	}

	private String getJwtFromRequest(HttpServletRequest request) {
		String jwt = request.getHeader(SecurityConstants.HEADER_STRING);
		if (jwt == null)
			return null;
		if (StringUtils.hasText(jwt) && jwt.startsWith(SecurityConstants.TOKEN_PREFIX)) {
			return jwt.substring(7, jwt.length()); // remove prefix from token
		}
		return null;
	}

	// validate jwt token
	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(SecurityConstants.SECRET_KEY).parseClaimsJws(token);
			return true;

		} catch (SignatureException e) {
			System.out.println("Invalid JWT Signature");
		} catch (MalformedJwtException e) {
			System.out.println("Invalid JWT Token");
		} catch (ExpiredJwtException e) {
			System.out.println("Expired JWT Token");
		} catch (UnsupportedJwtException e) {
			System.out.println("Unsupport JWT Token");
		} catch (IllegalArgumentException e) {
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

	// get user id from token
	public String getUsernameFromToken(String token) {
		Claims claims = Jwts.parser().setSigningKey(SecurityConstants.SECRET_KEY).parseClaimsJws(token).getBody();
		String username = (String) claims.get("username");
		return username;
	}

}
